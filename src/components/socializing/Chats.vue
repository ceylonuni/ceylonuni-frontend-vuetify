<template>
  <div style="overflow-y: auto; max-height: calc(100vh - 100px)">
    <Friends :items="friends" title="Friends" />
  </div>
</template>
<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    Friends: () =>
      import(
        /* webpackChunkName: "component-socializing-post-likes" */ "@/components/socializing/FriendsList"
      ),
  },
  data: () => ({
    friends: [],
  }),
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  mounted() {
    this.getFriends();
  },
  methods: {
    getFriends() {
      this.isApiLoading = true;
      axios
        .get("http://localhost:3002/api/socializing/v1/friend/all", {
          headers: {
            Authorization: "Bearer " + this.auth.token,
          },
        })
        .then((response) => {
          this.friends = response.data;
          this.isApiLoading = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>