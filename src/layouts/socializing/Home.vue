<template>
  <v-app>
    <v-app-bar app flat color="white" align-center clipped-right>
      <v-text-field
        background-color="grey lighten-4"
        solo
        flat
        rounded
        dense
        hide-details
        label="Search Ceylonuni"
        prepend-inner-icon="mdi-magnify"
        @change="search"
        v-model="searchKey"
      />
      <v-divider vertical inset class="mx-3" />

      <v-btn
        elevation="0"
        small
        text
        rounded
        :to="{ name: 'SocializingHome' }"
        class="text-capitalize"
        color="teal"
      >
        <v-icon small color="teal darken-1"> mdi-account-group </v-icon>
        socializing
      </v-btn>
      <v-btn
        elevation="0"
        small
        text
        rounded
        :to="{ name: 'EventHome' }"
        class="text-capitalize"
      >
        <v-icon small color="grey darken-1"> mdi-calendar-star </v-icon>
        events
      </v-btn>
      <v-btn elevation="0" small text rounded class="text-capitalize" :to="{ name: 'StudyHome' }">
        <v-icon small color="grey darken-1"> mdi-bookshelf </v-icon>
        Study area
      </v-btn>
      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon large color="grey" class="mx-1" v-bind="attrs" v-on="on">
            <v-badge color="red" :content="total" :value="total" overlap>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="{ name: 'SocializingPeople', query:{key:'requests'} }">
            <v-list-item-title
              >You have {{ data.friend_requests }} friends
              requests.</v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item :to="{ name: 'YourCollboratedEvent' }">
            <v-list-item-title
              >You have {{ data.event_collaborators }} event collaboration
              requests.</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            large
            color="grey"
            class="mx-1"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title
              >{{ auth.student.first_name }}
              {{ auth.student.last_name }}</v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item :to="{ name: 'AuthLogout' }">
            <v-list-item-title class="red--text">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar tile>
          <v-img :src="require('@/assets/logo_sm.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="teal--text text-h6">
          Ceylonuni
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex" style="background-color: rgb(245, 250, 250)">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    //
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  data: () => ({
    data: {},
    total: 0,
    drawer: true,
    isCreatePost: false,
    items: [],
    mini: false,
    searchKey: "",
  }),
  created() {
    console.log(this.auth)
    this.items = [
      { title: "Home", icon: "mdi-home", route: { name: "SocializingHome" } },
      {
        title: "My Account",
        icon: "mdi-account",
        route: {
          name: "AuthMyAccount",
          params: { username: this.auth.student.username },
        },
      },
      {
        title: "Peoples",
        icon: "mdi-account-multiple",
        route: { name: "SocializingPeople" },
      },
    ];
  },
  mounted() {
    this.getNotification();
  },
  methods: {
    getNotification() {
      axios
        .get(`${this.$api.servers.auth}/notification/get`, {
          headers: {
            Authorization: "Bearer " + this.auth.token,
          },
        })
        .then((response) => {
          this.data = response.data;
          this.total =
            this.data.friend_requests + this.data.event_collaborators;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search() {
      this.$router.push({
        name: "SearchResults",
        query: { q: this.searchKey },
      });
      console.log(this.searchKey);
    },
  },
};
</script>
