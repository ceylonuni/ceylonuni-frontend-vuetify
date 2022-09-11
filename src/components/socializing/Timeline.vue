<!-- eslint-disable prettier/prettier -->
<template>
  <Post type="image" />
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  components: {
    Post: () =>
      import(
        /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/Post/AbstractPost"
      ),
  },
  props: ["type", "data"],
};
</script>