<template>
  <div>
    <div class="d-flex justify-center py-3">
      <v-btn class="mx-auto" width="600"  color="teal" dark x-large @click="createPost">
        <v-icon>mdi-lightning-bolt</v-icon>
        Create Post
      </v-btn>
    </div>
    <v-divider class="mx-auto my-3" width="600"></v-divider>
    

    <div class="pa-3" v-for="(post, i) in posts" :key="i">
      <Post :data="post" @getPosts="getPosts" />
    </div>
     <!-- dialogs -->
     <DialogCreatePost v-if="isCreatePost" :callbackClose="closeCreatePost" />
  </div>
</template>
<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    DialogCreatePost: () =>
      import(
        /* webpackChunkName: "component-socializing-create-post" */ "@/components/socializing/NewPostDialog"
      ),
    Post: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/Post/PostFrame"
      ),
  },
  data() {
    return {
      posts: null,
      isCreatePost: false,
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  methods: {
    createPost() {
      this.isCreatePost = true;
    },
    closeCreatePost() {
      this.isCreatePost = false;
      this.getPosts()
    },
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