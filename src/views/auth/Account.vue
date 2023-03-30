<template>
  <v-row>
    <v-col
      class="flex-grow-1 flex-shrink-0 d-flex flex-column justify-center align-center"
    >
      <v-card width="100%" max-height="300">
        <v-img
          height="100%"
          src="https://img.freepik.com/free-vector/pastel-watercolor-painted-background_23-2148959638.jpg"
        >
          <div class="fill-height d-flex align-end py-3 px-6">
            <div class="d-flex flex-column">
              <v-avatar class="profile mb-3" color="teal" size="150">
                <img
                  v-if="profile.students.image_url"
                  :src="profile.students.image_url"
                  :alt="profile.students.first_name"
                />
                <span v-else class="white--text text-h2"
                  >{{ profile.students.first_name[0]
                  }}{{ profile.students.last_name[0] }}</span
                >
              </v-avatar>
              <div class="teal--text text--darken-2">
                <div class="text-h6">
                  {{ profile.students.first_name }}
                  {{ profile.students.last_name }}
                </div>
                <div>
                  {{ profile.students.university_courses.universities.name }}
                  |
                  {{ profile.students.university_courses.courses.name }}
                </div>
              </div>
            </div>

            <v-spacer></v-spacer>
            <div>
              <div v-if="auth.student.id == profile.students.id">
                <v-btn color="primary"
                  ><v-icon>mdi-account-edit</v-icon> Edit</v-btn
                >
              </div>
              <div
                v-else-if="profile.students.friends.includes(auth.student.id)"
              >
                <v-chip color="primary">
                  <v-icon>mdi-account-check</v-icon> Friends</v-chip
                >
              </div>
              <div
                v-else-if="
                  profile.students.friend_requests.includes(auth.student.id)
                "
              >
                <v-chip color="primary">
                  <v-icon>mdi-check</v-icon> Requested</v-chip
                >
                <v-btn
                  color="grey darken-3"
                  small
                  text
                  class="ml-1"
                  :loading="isCancelApiLoading"
                  @click="cancelRequest()"
                  >Cancel</v-btn
                >
              </div>
              <div
                v-else-if="
                  profile.students.send_requests.includes(auth.student.id)
                "
              >
                <v-btn
                  color="primary"
                  :loading="isApiLoading"
                  @click="acceptRequest()"
                >
                  <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                  Accept</v-btn
                >
                <v-btn
                  color="grey darken-3"
                  small
                  text
                  class="ml-1"
                  :loading="isCancelApiLoading"
                  @click="rejectRequest()"
                  >Cancel</v-btn
                >
              </div>
              <div v-else>
                <v-btn
                  color="primary"
                  :loading="isApiLoading"
                  @click="sendRequest()"
                  >Add Friend</v-btn
                >
              </div>
            </div>
            <div v-if="auth.student.id != profile.students.id">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    large
                    color="black"
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
        </v-img>
      </v-card>
      <div class="d-flex justify-center py-3">
        <v-btn
          v-if="auth.student.id == profile.students.id"
          class="mx-auto"
          width="600"
          color="teal"
          dark
          x-large
          @click="createPost"
        >
          <v-icon>mdi-lightning-bolt</v-icon>
          Create Post
        </v-btn>
      </div>
      <v-divider class="mx-auto my-3" width="600"></v-divider>
      <div>
        <div class="pa-3" v-for="(post, i) in profile.students.posts" :key="i">
          <Post :data="post" @getPosts="getProfile" />
        </div>
        <div
          class="pa-3"
          v-if="
            profile.students &&
            profile.students.posts &&
            profile.students.posts.length == 0
          "
        >
          <div class="text-center">
            <div class="d-flex flex-column align-center teal--text text-h5">
              <v-icon x-large color="teal darken-1"> mdi-image-area </v-icon>
              No Posts available
            </div>
            <div class="grey--text">
              Study area is currently under construction and will be launching
              soon.
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <!-- dialogs -->
    <DialogCreatePost v-if="isCreatePost" :callbackClose="closeCreatePost" />
    <ReportDialog
      v-if="isCreateReport"
      model="student"
      :model_id="profile.students.id"
      :data="profile.students"
      :callbackClose="closeCreateReport"
    />
  </v-row>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    DialogCreatePost: () =>
      import(
        /* webpackChunkName: "component-socializing-create-post" */ "@/components/socializing/NewPostDialog"
      ),
    Post: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/Post/PostFrame"
      ),
  },
  data() {
    return {
      isCreatePost: false,
      isApiLoading: false,
      isCancelApiLoading: false,
      isCreateReport: false,
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
      profile: {},
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  mounted() {
    this.getProfile();
  },
  methods: {
    createPost() {
      this.isCreatePost = true;
    },
    closeCreatePost() {
      this.isCreatePost = false;
      this.getProfile();
    },
    createReport() {
      this.isCreateReport = true;
    },
    closeCreateReport() {
      this.isCreateReport = false;
    },
    sendRequest() {
      this.isApiLoading = true;
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/friend/send-request",
          { student_id: this.profile.students.id },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.getProfile();
          this.isApiLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    rejectRequest() {
      this.isCancelApiLoading = true;
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/friend/reject-request",
          { student_id: this.profile.students.id },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.getProfile();
          this.isCancelApiLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelRequest() {
      this.isCancelApiLoading = true;
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/friend/cancel-request",
          { student_id: this.profile.students.id },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.getProfile();
          this.isCancelApiLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    acceptRequest() {
      this.isApiLoading = true;
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/friend/accept-request",
          { student_id: this.profile.students.id },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.getProfile();
          this.isApiLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProfile() {
      this.isApiLoading = true;
      axios
        .post(
          "http://localhost:3000/api/auth/v1/profile/get",
          { username: this.$route.params.username },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.profile = response.data;
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