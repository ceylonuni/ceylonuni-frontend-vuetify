<template>
  <v-row dense>
    <v-col v-for="event in events" :key="event.title" cols="4">
        <EventCard :data="event" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    EventCard: () =>
      import(
        /* webpackChunkName: "component-event-event-card" */ "@/components/event/EventCard"
      ),
  },
  data() {
    return {
      events: [
        {
          title: "Pre-fab homes",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 4,
        },
        {
          title: "Favorite road trips",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 4,
        },
        {
          title: "Best airlines",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 4,
        },
      ],
    };
  },
};
</script>
