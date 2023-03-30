<template>
  <v-row>
    <v-col class="flex-grow-1 flex-shrink-0">
      <v-card width="100%">
        <v-img
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4) , rgba(0,0,0,.6)"
        width="100%"
        max-height="300px"
          :src="
            event.image_url
              ? event.image_url
              : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
          "
        >
          <v-row align="end" class="fill-height">
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ event.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ event.venue }}
                    |
                    {{ $moment(event.start_at).format("DD MMM YYYY hh:mm A") }}
                    -
                    {{
                      $moment(event.end_at).format("DD MMM YYYY hh:mm A")
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col class="py-0">
              <div class="d-flex">
                <v-spacer></v-spacer>
                <div v-if="auth.student.id == event.student_id" class="pr-2">
                  <v-btn @click="editEvent()" color="primary"
                    ><v-icon>mdi-calendar-edit</v-icon> Edit</v-btn
                  >
                </div>
                <div v-if="auth.student.id != event.student_id">
                  <v-menu
                    bottom
                    origin="center center"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        large
                        color="white"
                        class="mx-1"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="createReport()">
                        <v-list-item-title class="red--text"
                          >Report</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <div class="text-center">
        <v-btn
          width="50%"
          v-if="checkStudent() && !isApiLoading"
          class="mt-3"
          color="primary"
          @click="createPost()"
          >Create post</v-btn
        >
      </div>

      <div v-if="!isApiLoading">
        <div class="pa-3" v-for="(post, i) in event.posts" :key="i">
          <Post :data="post" @getPosts="getPosts" />
        </div>
        <div
          class="pa-3"
          v-if="event && event.posts && event.posts.length == 0"
        >
          <div class="text-center">
            <div class="d-flex flex-column align-center teal--text text-h5">
              <v-icon x-large color="teal darken-1"> mdi-image-area </v-icon>
              No Posts available
            </div>
            <div class="grey--text">
              You didn't post anything in ceylonuni yet!
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-0">
      <div style="width: 300px">
        <div class="d-flex" style="position: fixed; right: 0">
          <v-divider vertical class="mx-3" />
          <Participant :items="event.participants" />
        </div>
      </div>
    </v-col>
    <!-- dialogs -->
    <DialogCreatePost
      v-if="isCreatePost"
      :event_id="event.id"
      :callbackClose="closeCreatePost"
    />
    <DialogEditEvent
      v-if="isEditEvent"
      :event="event"
      :callbackClose="closeEditEvent"
    />
    <ReportDialog
      v-if="isCreateReport"
      model="event"
      :model_id="event.id"
      :data="event"
      :callbackClose="closeCreateReport"
    />
  </v-row>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    Post: () =>
      import(
        /* webpackChunkName: "component-event-post" */ "@/components/event/Post/PostFrame"
      ),
    Participant: () =>
      import(
        /* webpackChunkName: "component-event-participant" */ "@/components/event/Participant"
      ),
    DialogCreatePost: () =>
      import(
        /* webpackChunkName: "component-event-create-post" */ "@/components/event/NewPostDialog"
      ),
    DialogEditEvent: () =>
      import(
        /* webpackChunkName: "component-event-edit" */ "@/components/event/EditEventDialog"
      ),
  },
  data() {
    return {
      isCreatePost: false,
      isApiLoading: false,
      isCancelApiLoading: false,
      isCreateReport: false,
      isEditEvent: false,
      filters: [
        { title: "All", icon: "mdi-ballot", key: "all" },
        { title: "Friends", icon: "mdi-account-multiple", key: "friends" },
        {
          title: "Friend Request",
          icon: "mdi-account-multiple-plus",
          key: "requests",
        },
        {
          title: "Suggestions",
          icon: "mdi-account-multiple-check",
          key: "suggestions",
        },
      ],
      selctedKey: null,
      results: [],
      event: {},
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  mounted() {
    this.getEvent();
  },
  methods: {
    createPost() {
      this.isCreatePost = true;
    },
    createReport() {
      this.isCreateReport = true;
    },
    editEvent() {
      this.isEditEvent = true;
    },
    closeCreateReport() {
      this.isCreateReport = false;
    },
    closeEditEvent() {
      this.getEvent();
      this.isEditEvent = false;
    },
    checkStudent() {
      if (
        this.event.event_collaborators.find(
          (e) => e.student_id === this.auth.student.id
        ) &&
        this.event.status == "published"
      ) {
        return true;
      } else {
        return false;
      }
    },
    closeCreatePost() {
      this.isCreatePost = false;
      this.getEvent();
    },
    getEvent() {
      this.isApiLoading = true;
      axios
        .post(
          `${this.$api.servers.event}/read`,
          { key: this.$route.params.key },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          this.event = response.data;
          this.isApiLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPosts() {
      //
    },
  },
};
</script>