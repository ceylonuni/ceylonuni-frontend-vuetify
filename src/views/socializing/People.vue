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
      <div
        class="pa-3"
        v-for="(people, i) in results.filter(
          (element) => element.type == 'people'
        )"
        :key="i + 'people'"
      >
        <PeopleCard :data="people"></PeopleCard>
      </div>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-0">
      <v-navigation-drawer app clipped permanent right color="transparent">
        <v-list dense>
          <v-list-item v-for="item in filters" :key="item.title" link>
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
export default {
  components: {
    PeopleCard: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/PeopleCard"
      ),
  },
  data() {
    return {
      filters: [
        { title: "All", icon: "mdi-ballot" },
        { title: "Friends", icon: "mdi-account-multiple" },
        { title: "Friend Request", icon: "mdi-account-multiple-plus" },
        { title: "Suggestions", icon: "mdi-account-multiple-check" },
      ],

      results: [
        {
          type: "people",
          name: "Josiah Prathaban",
          university: "University of Kelaniya",
          faculty: "Faculty of Science",
          isFriend: true,
        },
        {
          type: "people",
          name: "Kumar Kanunakaran",
          university: "University of Colombo",
          faculty: "Faculty of Arts",
          isFriend: false,
        },
        {
          type: "people",
          name: "Josiah Prathaban",
          university: "University of Kelaniya",
          faculty: "Faculty of Science",
          isFriend: true,
        },
        {
          type: "people",
          name: "Kumar Kanunakaran",
          university: "University of Colombo",
          faculty: "Faculty of Arts",
          isFriend: false,
        },
        {
          type: "people",
          name: "Josiah Prathaban",
          university: "University of Kelaniya",
          faculty: "Faculty of Science",
          isFriend: true,
        },
        {
          type: "people",
          name: "Kumar Kanunakaran",
          university: "University of Colombo",
          faculty: "Faculty of Arts",
          isFriend: false,
        },
      ],
    };
  },

  methods: {
    getPosts() {
      //
    },
  },
};
</script>