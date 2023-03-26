<template>
  <div>
    <v-row v-if="data && data.id">
      <v-col cols="8" class="flex-grow-1 flex-shrink-0">
        <v-card class="mx-auto" max-width="600" flat outlined>
          <ImagePost :data="data.image_url" v-if="data.image_url" />
          <VideoPost :data="data.video_url" v-else-if="data.video_url" />
          <TextPost :data="data.text" v-else />
          <v-card-subtitle
            v-if="data.events"
            class="pb-0 d-flex align-center justify-space-between"
          >
            <div class="d-flex align-center">
              <div class="ml-2">
                <div class="font-weight-bold">
                  Event: {{ data.events.name }}
                </div>
                <div class="text-caption">
                  {{ data.events.venue }}
                </div>
              </div>
            </div>

            <div>
              <v-btn
                :to="{ name: 'EventRead', params: { key: data.events.key } }"
                color="primary"
                >View Event</v-btn
              >
            </div>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-subtitle
            class="pb-0 d-flex align-center justify-space-between"
          >
            <div @click="goAccount(data)" class="d-flex align-center">
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
                <v-icon>{{ liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
                {{ data.likes.length }}
              </v-btn>
              <v-btn icon large color="grey" @click="comment()" class="mx-1">
                <v-icon>mdi-comment-outline</v-icon> {{ data.comments.length }}
              </v-btn>
              <ShareButton :url="`${$app_url}/posts/${data.key}`" />
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    large
                    color="grey"
                    @click="share()"
                    class="mx-1"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-if="auth.student.id == data.student_id"
                    @click="editPost()"
                  >
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="auth.student.id == data.student_id"
                    @click="deletePost()"
                  >
                    <v-list-item-title class="red--text"
                      >Delete</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item
                    v-if="auth.student.id != data.student_id"
                    @click="createReport()"
                  >
                    <v-list-item-title class="red--text"
                      >Report</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-subtitle>

          <v-card-text
            class="text--primary ma-2"
            v-if="data.image_url || data.video_url"
          >
            <div>{{ data.text }}</div>
          </v-card-text>

          <div class="ma-3">
            <v-divider class="mt-5 mb-3" />
            <Comments :data="data" @getPosts="getPost" />
          </div>
        </v-card>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-0">
        <div style="width: 300px">
          <div class="d-flex" style="position: fixed; right: 0">
            <v-divider vertical class="mx-3" />
            <Friends :items="data.likes" title="likes" />
          </div>
        </div>
      </v-col>
      <ReportDialog
        v-if="isCreateReport"
        model="posts"
        :model_id="data.id"
        :data="data"
        :callbackClose="closeCreateReport"
      />
      <DeleteDialog
        v-if="isDeletePost"
        type="post"
        :id="data.id"
        :url="`${this.$api.servers.socializing}/post/delete`"
        :callbackClose="closeDeletePost"
      />
      <DialogEditPost
        v-if="isEditPost"
        :text="data.text"
        :callbackClose="closeEditPost"
      />
    </v-row>
    <div v-else>Post not available.</div>
  </div>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  components: {
    DialogEditPost: () =>
      import(
        /* webpackChunkName: "component-socializing-edit-post" */ "@/components/common/EditPostDialog"
      ),
    ImagePost: () =>
      import(
        /* webpackChunkName: "component-socializing-post-image" */ "@/components/socializing/Post/PostImage"
      ),
    Friends: () =>
      import(
        /* webpackChunkName: "component-socializing-post-likes" */ "@/components/socializing/Friends"
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
  data() {
    return {
      liked: false,
      isApiLoading: false,
      data: {},
      isCreateReport: false,
      isDeletePost: false,
      isEditPost: false,
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  mounted() {
    this.getPost();
  },
  methods: {
    createReport() {
      this.isCreateReport = true;
    },
    deletePost() {
      this.isDeletePost = true;
    },
    editPost() {
      this.isEditPost = true;
    },
    closeDeletePost() {
      this.data = {};
      this.getPost();
      this.isDeletePost = false;
    },
    closeEditPost() {
      this.getPost();
      this.isEditPost = false;
    },
    closeCreateReport() {
      this.isCreateReport = false;
    },
    checkStudent() {
      if (
        this.event.event_collaborators.find(
          (e) => e.student_id === this.auth.student.id
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    dislike() {
      axios
        .post(
          `${this.$api.servers.socializing}/post/${this.data.id}/like/remove`,
          {},
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.getPost();
          this.liked = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    like() {
      axios
        .post(
          `${this.$api.servers.socializing}/post/${this.data.id}/like/add`,
          {},
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.getPost();
          this.liked = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPost() {
      this.isApiLoading = true;
      axios
        .post(
          `${this.$api.servers.socializing}/post/read`,
          { key: this.$route.params.key },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          this.data = response.data;
          var likes = this.data.likes;
          var student_id = this.auth.student.id;
          var liked = this.$_.find(likes, function (n) {
            if (n.students.id == student_id) {
              return true;
            }
          });
          if (liked && liked.students) {
            this.liked = true;
          }
          this.isApiLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>