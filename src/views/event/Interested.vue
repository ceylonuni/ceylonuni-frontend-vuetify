<template>
  <v-row dense>
    <v-col v-for="event in events" :key="event.id" cols="4">
        <EventCard :data="event.events" :isCollborated="false" @getData="getEvents()" />
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    EventCard: () =>
      import(
        /* webpackChunkName: "component-event-event-card" */ "@/components/event/EventCard"
      ),
  },
  data() {
    return {
      // events: [
      //   {
      //     title: "Pre-fab homes",
      //     src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      //     flex: 4,
      //   },
      //   {
      //     title: "Favorite road trips",
      //     src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
      //     flex: 4,
      //   },
      //   {
      //     title: "Best airlines",
      //     src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      //     flex: 4,
      //   },
      // ],

      events:[],
      isApiLoading: false,
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  mounted() {
    this.getEvents();
  },
  methods: {
   
    getEvents() {
      this.isApiLoading = true;
      axios
        .get(
          `${this.$api.servers.event}/getInterested`,
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          this.events = response.data;
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
