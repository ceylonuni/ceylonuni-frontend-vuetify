<template>
  <v-card class="mx-auto" max-width="600" flat outlined>
    <ImagePost :data="data.image_url" v-if="data.image_url" />
    <VideoPost :data="data.video_url" v-else-if="data.video_url" />
    <TextPost :data="data.text" v-else />

    <v-card-subtitle class="pb-0 d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-avatar color="teal">
          <img
            v-if="data.students.image_url"
            :src="data.students.image_url"
            :alt="data.students.first_name"
          />
          <span v-else class="white--text text-h5"
            >{{ data.students.first_name[0]
            }}{{ data.students.last_name[0] }}</span
          >
        </v-avatar>
        <div class="ml-2">
          <div class="font-weight-bold">
            {{ data.students.first_name }} {{ data.students.last_name }}
          </div>
          <div class="text-caption">
            {{ $moment(data.created_at).fromNow() }}
          </div>
        </div>
      </div>

      <div>
        <v-btn
          icon
          large
          :color="liked ? 'teal' : 'grey'"
          @click="liked ? dislike() : like()"
          class="mx-1"
        >
          <v-icon>{{ liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon> 13
        </v-btn>
        <v-btn icon large color="grey" @click="comment()" class="mx-1">
          <v-icon>mdi-comment-outline</v-icon> 5
        </v-btn>
        <v-btn icon large color="grey" @click="share()" class="mx-1">
          <v-icon>mdi-share-outline</v-icon> 5
        </v-btn>
      </div>
    </v-card-subtitle>

    <v-card-text
      class="text--primary ma-2"
      v-if="data.image_url || data.video_url"
    >
      <div>{{ data.text }}</div>
    </v-card-text>

    <div class="ma-3" >
      <v-divider v-if="commentsPanel" class="mt-5 mb-3" />
      <Comments v-if="commentsPanel" :data="data" />
    </div>
  </v-card>
</template>
  <script>
export default {
  components: {
    ImagePost: () =>
      import(
        /* webpackChunkName: "component-socializing-post-image" */ "@/components/socializing/Post/PostImage"
      ),
    VideoPost: () =>
      import(
        /* webpackChunkName: "component-socializing-post-video" */ "@/components/socializing/Post/PostVideo"
      ),
    TextPost: () =>
      import(
        /* webpackChunkName: "component-socializing-post-text" */ "@/components/socializing/Post/PostText"
      ),
    Comments: () =>
      import(
        /* webpackChunkName: "component-socializing-post-comments" */ "@/components/socializing/Post/Comments"
      ),
  },
  props: ["data"],
  data: () => ({
    liked: false,
    commentsPanel: false,
  }),
  methods: {
    like() {
      this.liked = true;
    },
    dislike() {
      this.liked = false;
    },
    comment() {
      this.commentsPanel = !this.commentsPanel;
    },
    share() {},
  },
};
</script>