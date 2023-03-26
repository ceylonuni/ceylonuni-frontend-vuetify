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
          </div>
        </v-img>
      </v-card>
      <div v-if="!isApiLoading">
        <div class="pa-3" v-for="(post, i) in profile.students.posts" :key="i">
          <Post :data="post" @getPosts="getPosts" />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    Post: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/Post/PostFrame"
      ),
  },
  data() {
    return {
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