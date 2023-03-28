<template>
  <div>
    <div class="d-flex justify-center py-3">
      <v-btn class="mx-auto" width="600"  color="teal" dark x-large>
        <v-icon>mdi-lightning-bolt</v-icon>
        Create Post
      </v-btn>
    </div>
    <v-divider class="mx-auto my-3" width="600"></v-divider>
    

    <div class="pa-3" v-for="(post, i) in posts" :key="i">
      <Post :data="post" @getPosts="getPosts" />
    </div>
  </div>
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
      posts: null,
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  methods: {
    getPosts() {
      axios
        .get("http://localhost:3002/api/socializing/v1/post/collapse/all", {
          headers: {
            Authorization: "Bearer " + this.auth.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>