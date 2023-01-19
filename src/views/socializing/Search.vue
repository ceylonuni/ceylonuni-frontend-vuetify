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

      <v-divider class="my-5"  />
      
      <div
        class="pa-3"
        v-for="(post, i) in results.filter((element) => element.type == 'post')"
        :key="i + 'post'"
        style="width: 100% !important"
      >
        <Post :data="post" @getPosts="getPosts" />
      </div>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-0">
      <v-navigation-drawer permanent right color="transparent">
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
    Post: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/Post/PostFrame"
      ),

    PeopleCard: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/PeopleCard"
      ),
  },
  data() {
    return {
      filters: [
        { title: "All", icon: "mdi-ballot" },
        { title: "People", icon: "mdi-account" },
        { title: "Pages", icon: "mdi-book-open-page-variant" },
        { title: "Groups", icon: "mdi-account-group" },
        { title: "Posts", icon: "mdi-post-outline" },
        { title: "Events", icon: "mdi-calendar" },
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
          type: "post",
          comments: [
            {
              created_at: "2022-09-18T17:13:29.737Z",
              students: {
                first_name: "Josiah",
                image_url: null,
                last_name: "Prathaban",
              },
              text: "Hello Josiah, How are you doing?",
            },
          ],
          created_at: "2022-09-18T10:26:46.480Z",
          id: 4,
          image_url: null,
          key: "3918f5ee-ce43-4032-94d1-9dd39dae171f",
          like_count: 0,
          likes: [
            {
              students: {
                first_name: "Josiah",
                id: 1,
                image_url: null,
                last_name: "Prathaban",
              },
            },
          ],
          students: {
            first_name: "Josiah",
            image_url: null,
            last_name: "Prathaban",
          },
          text: "Hello Sachin!",
          video_url: null,
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