<template>
  <div>
    <!-- <v-card class="py-2" outlined rounded="lg" max-width="600">
    <v-list-item>
      <v-list-item-avatar @click="goAccount()" size="100" rounded="circle" color="grey">
        <v-img
          v-if="data.image_url"
          class="ml-auto mr-auto"
          contain
          max-height="150"
          max-width="250"
          :src="data.image_url"
        ></v-img>
        <span v-else class="white--text text-h3"
          >{{ data.first_name[0] }}{{ data.last_name[0] }}</span
        >
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title @click="goAccount()" class="text-h6">
          {{ data.first_name }} {{ data.last_name }}
        </v-list-item-title>
        <v-list-item-subtitle class="mt-1 ml-1">
          {{ data.university_courses.universities.name }} |
          {{ data.university_courses.courses.name }}
        </v-list-item-subtitle>
        <v-chip
          v-if="auth.student.id == data.id"
          small
          class="mt-3 ml-1 text-center"
          style="max-width: 100px"
        >
          <v-icon small class="mr-3">mdi-account</v-icon>You
        </v-chip>
        <v-chip
          v-else-if="data.friends.includes(auth.student.id)"
          small
          class="mt-3 ml-1 text-center"
          style="max-width: 100px"
        >
          <v-icon small class="mr-3">mdi-account-check</v-icon>Friend
        </v-chip>
        <v-chip
          v-else-if="data.friend_requests.includes(auth.student.id)"
          small
          class="mt-3 ml-1 text-center"
          style="max-width: 100px"
        >
          <v-icon small class="mr-3">mdi-account-check</v-icon>Requested
        </v-chip>
        <v-btn
        v-else-if="data.send_requests.includes(auth.student.id)"
          outlined
          rounded
          text
          max-width="150"
          small
          class="mt-3 ml-1"
          :loading="isApiLoading"
          @click="acceptRequest()"
        >
          <v-icon small class="mr-3">mdi-account-plus</v-icon> Accept
        </v-btn>
        <v-btn
          outlined
          rounded
          text
          max-width="150"
          small
          class="mt-3 ml-1"
          :loading="isApiLoading"
          @click="sendRequest()"
          v-else
        >
          <v-icon small class="mr-3">mdi-account-plus</v-icon> Add Friend
        </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-card> -->

    <v-card>
      <v-img
        :src="
          data.image_url
            ? data.image_url
            : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
        "
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
      <v-chip class="ma-2" v-if="data.student_id == auth.student.id"> {{ data.status }} </v-chip>
        <v-card-title v-text="data.name"></v-card-title>
      </v-img>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-3"
          color="primary"
          dark
          :to="{ name: 'EventRead', params: { key: data.key } }"
        >
          View
        </v-btn>
        <v-menu bottom origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :loading="isApiLoading"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              :outlined="!data.participants[0]"
            >
              <span
                v-if="
                  data.participants[0] && data.participants[0].status == 'going'
                "
                >Going</span
              >
              <span v-else>Interested</span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="sendInterest('interested')">
              <v-list-item-title
                ><span
                  :class="
                    data.participants[0] &&
                    data.participants[0].status == 'interested'
                      ? 'teal--text'
                      : 'black--text'
                  "
                  >Interested</span
                ></v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="sendInterest('going')">
              <v-list-item-title
                ><span
                  :class="
                    data.participants[0] &&
                    data.participants[0].status == 'going'
                      ? 'teal--text'
                      : 'black--text'
                  "
                  >Going</span
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
      <v-divider v-if="isCollborated"></v-divider>
      <v-card-actions v-if="isCollborated">
        <v-spacer></v-spacer>
        <v-btn
          class="mr-3"
          @click="accept()"
          :loading="isAcceptApiLoading"
          color="primary"
          :disabled="collboratedStatus"
        >
          <span v-if="collboratedStatus">Collborated</span
          ><span v-else>Accept</span>
        </v-btn>
        <v-btn
          @click="leave()"
          :loading="isLeaveApiLoading"
          v-if="collboratedStatus"
          color="primary"
          dark
          outlined
        >
          Leave
        </v-btn>

        <v-btn
          @click="reject()"
          :loading="isRejectApiLoading"
          v-else
          color="primary"
          dark
          outlined
        >
          Reject
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  props: ["data", "isCollborated", "collboratedStatus"],

  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  data() {
    return {
      isApiLoading: false,
      isAcceptApiLoading: false,
      isLeaveApiLoading: false,
      isRejectApiLoading: false,
    };
  },
  methods: {
    goAccount() {
      this.$router.push({
        name: "AuthMyAccount",
        params: { username: this.data.accounts[0].username },
      });
    },
    sendInterest(status) {
      this.isApiLoading = true;
      axios
        .post(
          `${this.$api.servers.event}/participant/add`,
          { event_id: this.data.id, status: status },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.$emit("getData");
          this.isApiLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    accept() {
      this.isAcceptApiLoading = true;
      axios
        .post(
          `${this.$api.servers.event}/collaborator/accept`,
          { event_id: this.data.id },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.$emit("getData");
          this.isAcceptApiLoading = false;
        })
        .catch((error) => {
          this.isAcceptApiLoading = false;
          console.log(error);
        });
    },
    leave() {
      this.isLeaveApiLoading = true;
      axios
        .post(
          `${this.$api.servers.event}/collaborator/leave`,
          { event_id: this.data.id },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.$emit("getData");
          this.isLeaveApiLoading = false;
        })
        .catch((error) => {
          this.isLeaveApiLoading = false;
          console.log(error);
        });
    },
    reject() {
      this.isRejectApiLoading = true;
      axios
        .post(
          `${this.$api.servers.event}/collaborator/leave`,
          { event_id: this.data.id },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then(() => {
          this.$emit("getData");
          this.isRejectApiLoading = false;
        })
        .catch((error) => {
          this.isRejectApiLoading = false;
          console.log(error);
        });
    },
  },
};
</script>