<template>
  <ImagePost :data="data"  v-if="type == 'image'" />
  <VideoPost :data="data" v-else-if="type == 'video'" />
  <TextPost :data="data" v-else />
</template>
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