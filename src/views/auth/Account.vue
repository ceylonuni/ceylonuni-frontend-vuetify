<template>
  <v-row>
    <v-col
      class="
        flex-grow-1 flex-shrink-0
        d-flex
        flex-column
        justify-center
        align-center
      "
    >
      <v-card>
        <v-img
          height="100%"
          src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
        >
          <v-row align="end" class="fill-height">
            <v-col align-self="start" class="pa-0" cols="12">
              <v-avatar class="profile ma-6" color="grey" size="164">
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
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ profile.students.first_name }}
                    {{ profile.students.last_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{
                      profile.students.university_courses.universities.name
                    }}
                    |
                    {{
                      profile.students.university_courses.courses.name
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-action v-if="auth.student.id == profile.students.id">
                    <div>
                      <v-btn color="primary" >Edit</v-btn>
                    </div>
                  </v-list-item-action>
                  <v-list-item-action v-else-if="profile.students.friends.includes(auth.student.id)">
                    <div>
                      <v-btn color="primary">Friends</v-btn>
                    </div>
                  </v-list-item-action>
                  <v-list-item-action v-else-if="profile.students.friend_requests.includes(auth.student.id)">
                    <div>
                      <v-btn color="primary">Requested</v-btn>
                      <v-btn color="secondary" class="ml-3" :loading="isCancelApiLoading" @click="cancelRequest()">Cancel</v-btn>
                    </div>
                  </v-list-item-action>
                  <v-list-item-action v-else-if="profile.students.send_requests.includes(auth.student.id)">
                    <div>
                      <v-btn color="primary" :loading="isApiLoading" @click="acceptRequest()">Accept</v-btn>
                    <v-btn color="secondary" :loading="isCancelApiLoading" @click="rejectRequest()" class="ml-3">Cancel</v-btn>
                    </div>
                  </v-list-item-action>
                  <v-list-item-action v-else>
                    <div>
                      <v-btn color="primary" :loading="isApiLoading" @click="sendRequest()">Add Friend</v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
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
      this.isApiLoading = true
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
          this.getProfile()
          this.isApiLoading = false
        })
        .catch((error) => {
          console.log(error);
        });
    },
    rejectRequest() {
      this.isCancelApiLoading = true
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
          this.getProfile()
          this.isCancelApiLoading = false
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelRequest() {
      this.isCancelApiLoading = true
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
          this.getProfile()
          this.isCancelApiLoading = false
        })
        .catch((error) => {
          console.log(error);
        });
    },
    acceptRequest() {
      this.isApiLoading = true
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
          this.getProfile()
          this.isApiLoading = false
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