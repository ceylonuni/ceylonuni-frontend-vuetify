<template>
  <v-row>
    <v-col cols="8" class="flex-grow-1 flex-shrink-0">
      <v-card width="100%">
        <v-img
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
            <!-- <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-action>
                    <v-spacer></v-spacer>
                    <div>
                      <v-btn color="primary">Register</v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item-content>
              </v-list-item>
            </v-col> -->
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
  },
  data() {
    return {
      isCreatePost: false,
      isApiLoading: false,
      isCancelApiLoading: false,
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
    checkStudent() {
      if (
        this.event.event_collaborators.find(
          (e) => e.student_id === this.auth.student.id
        )
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