<template>
  <v-row dense>
    <v-col v-for="event in events" :key="event.id" cols="4">
        <EventCard :data="event.events" :isCollborated="false" @getData="getEvents()" />
    </v-col>
    <div class="pa-3 mt-12 pt-12" v-if="events.length == 0" style="width: 100%;">
      <div class="text-center">
        <div class="d-flex flex-column align-center teal--text text-h5">
          <v-icon x-large color="teal darken-1"> mdi-calendar </v-icon>
          No events available
        </div>
        <div class="grey--text">You didn't mark any events intrested yet!</div>
      </div>
    </div>
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
