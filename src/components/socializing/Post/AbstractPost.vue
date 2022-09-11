<!-- eslint-disable prettier/prettier -->
<template>
  <ImagePost v-if="type == 'image'" />
  <VideoPost v-else-if="type == 'video'" />
  <TextPost v-else />
</template>
<!-- eslint-disable prettier/prettier -->
  <script>
export default {
  components: {
    ImagePost: () =>
      import(
        /* webpackChunkName: "component-socializing-post-image" */ "@/components/socializing/Post/ImagePost"
      ),
    VideoPost: () =>
      import(
        /* webpackChunkName: "component-socializing-post-video" */ "@/components/socializing/Post/VideoPost"
      ),
    TextPost: () =>
      import(
        /* webpackChunkName: "component-socializing-post-text" */ "@/components/socializing/Post/TextPost"
      ),
  },
  props: ["type", "data"],
};
</script>