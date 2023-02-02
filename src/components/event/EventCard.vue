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

    <v-card >
      <v-img
        :src="data.src"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title v-text="data.title"></v-card-title>
      </v-img>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        class="mr-3"
          color="primary"
          dark
          :to="{name:'EventRead',params:{key:'123456'}}"
        >
        View
        </v-btn>
        <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          outlined
        >
        Interested
        </v-btn>
      </template>

      <v-list>
        <v-list-item
        >
          <v-list-item-title>Interested</v-list-item-title>
        </v-list-item>
        <v-list-item
        >
          <v-list-item-title>Going</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  props: ["data"],

  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  data() {
    return {
      isApiLoading: false,
    };
  },
  methods: {
    goAccount() {
      this.$router.push({
        name: "AuthMyAccount",
        params: { username: this.data.accounts[0].username },
      });
    },
    sendRequest() {
      this.isApiLoading = true;
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/friend/send-request",
          { student_id: this.data.id },
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
    acceptRequest() {
      this.isApiLoading = true;
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/friend/accept-request",
          { student_id: this.data.id },
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
  },
};
</script>