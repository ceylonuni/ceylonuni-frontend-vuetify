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
      <div class="pa-3" v-for="(people, i) in results" :key="i + 'people'">
        <PeopleCard
          :data="people"
          @getData="getPeople(selctedKey)"
        ></PeopleCard>
      </div>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-0">
      <v-navigation-drawer app clipped permanent right color="transparent">
        <v-list dense>
          <v-list-item
            v-for="item in filters"
            :key="item.title"
            @click="getPeople(item.key)"
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
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    PeopleCard: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/PeopleCard"
      ),
  },
  data() {
    return {
      isApiLoading: false,
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
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  mounted() {

    var key = 'all'
    if(this.$route.query.key){
      key = this.$route.query.key
    }
    this.getPeople(key);
  },
  methods: {
    getRequests() {
      this.isApiLoading = true;
      axios
        .get("http://localhost:3002/api/socializing/v1/general/requests", {
          headers: {
            Authorization: "Bearer " + this.auth.token,
          },
        })
        .then((response) => {
          this.results = response.data;
          this.isApiLoading = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFriends() {
      this.isApiLoading = true;
      axios
        .get("http://localhost:3002/api/socializing/v1/friend/all", {
          headers: {
            Authorization: "Bearer " + this.auth.token,
          },
        })
        .then((response) => {
          this.results = response.data;
          this.isApiLoading = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAll() {
      this.isApiLoading = true;
      axios
        .get("http://localhost:3002/api/socializing/v1/general/students", {
          headers: {
            Authorization: "Bearer " + this.auth.token,
          },
        })
        .then((response) => {
          this.results = response.data;
          this.isApiLoading = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPeople(key) {
      this.selctedKey = key;
      this.$router.push({name:'SocializingPeople', query:{key:this.selctedKey}})
      if (this.selctedKey == "all") {
        this.getAll();
      } else if (this.selctedKey == "requests") {
        this.getRequests();
      } else if (this.selctedKey == "friends") {
        this.getFriends();
      } else {
        this.getAll();
      }
    },
    getPosts() {
      //
    },
  },
};
</script>