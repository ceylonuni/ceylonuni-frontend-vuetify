<template>
  <div>
    <div class="pa-3" v-for="(post,i) in posts" :key="i">
    <Post :data="post" @getPosts="getPosts"/>
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
  methods:{
    getPosts(){
      axios
        .get(
          "http://localhost:3000/api/socializing/post/collapse/all",
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response)
         this.posts = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted(){
    this.getPosts()
  }
};
</script>