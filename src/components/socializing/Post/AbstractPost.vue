<template>
  <v-card class="mx-auto" max-width="600" flat outlined>
    <ImagePost :data="data.image_url" v-if="data.image_url" />
    <VideoPost :data="data.video_url" v-else-if="data.video_url" />
    <TextPost :data="data.text" v-else />

    <v-card-subtitle class="pb-0 d-flex align-center">
      <v-avatar color="teal">
        <img v-if="data.students.image_url" :src="data.students.image_url" :alt="data.students.first_name" />
        <span v-else class="white--text text-h5">{{data.students.first_name[0]}}{{data.students.last_name[0]}}</span>
      </v-avatar>
      <div class="ml-2">
        <div class="font-weight-bold">{{ data.students.first_name }} {{ data.students.last_name }}</div>
        <div class="text-caption"> {{$moment(data.created_at).fromNow()}}</div>
      </div>
    </v-card-subtitle>

    <v-card-text class="text--primary ma-2" v-if="data.image_url || data.video_url">
      <div>{{ data.text }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="" text> Share </v-btn>

      <v-btn color="orange" text> Explore </v-btn>
    </v-card-actions>
  </v-card>
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
  props: ["data"],
};
</script>