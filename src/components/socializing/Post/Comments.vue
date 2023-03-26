<template>
  <div class="mx-5">
    <div
      class="d-flex align-center pb-3"
      v-for="(comment, i) in data.comments"
      :key="i"
    >
      <v-avatar @click="goAccount()" color="teal" size="40">
        <img
          v-if="comment.students.image_url"
          :src="comment.students.image_url"
          :alt="comment.students.first_name"
        />
        <span v-else class="white--text text-h5"
          >{{ comment.students.first_name[0]
          }}{{ comment.students.last_name[0] }}</span
        >
      </v-avatar>
      <v-card class="ml-2 py-3 px-5" flat color="grey lighten-4" rounded="xl">
        <div class="d-flex">
          <div
            class="font-weight-medium text-caption grey--text text--darken-2"
          >
            {{ comment.students.first_name }} {{ comment.students.last_name }}
          </div>
          <v-spacer></v-spacer>
          <div class="mx-0 my-0">
            <v-menu bottom origin="center center" transition="scale-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="grey"
                  @click="share()"
                  class="mx-1"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-if="auth.student.id == comment.students.id"
                  @click="deleteComment(comment)"
                >
                  <v-list-item-title class="red--text"
                    >Delete</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  v-if="auth.student.id != comment.students.id"
                  @click="createReport(comment)"
                >
                  <v-list-item-title class="red--text"
                    >Report</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div class="text-caption">
          {{ comment.text }}
        </div>
        <div class="text-right" style="font-size: 10px">
          {{ $moment(comment.created_at).fromNow() }}
        </div>
      </v-card>
    </div>
    <v-divider class="my-3" v-if="data.comments.length != 0" />
    <div class="d-flex">
      <v-text-field
        v-model="comment"
        background-color="grey lighten-4"
        solo
        flat
        rounded
        dense
        hide-details
        label="Add your comments..."
      />
      <v-btn @click="submit" elevation="0" icon>
        <v-icon color="grey darken-1"> mdi-send </v-icon>
      </v-btn>
    </div>
    <ReportDialog
      v-if="isCreateReport"
      model="post"
      :model_id="selectedItem.id"
      :data="selectedItem"
      :callbackClose="closeCreateReport"
    />
    <DeleteDialog
      v-if="isDeleteItem"
      type="comments"
      :id="selectedItem.id"
      :url="`${this.$api.servers.socializing}/post/${data.id}/comment/delete`"
      :callbackClose="closeDeleteItem"
    />
  </div>
</template>
<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      comment: null,
      selectedItem: {},
      isCreateReport: false,
      isDeleteItem: false,
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  methods: {
    createReport(item) {
      this.selectedItem = item
      this.isCreateReport = true;
    },
    deleteComment(item) {
      this.selectedItem = item
    console.log(this.selectedItem)
      this.isDeleteItem = true;
    },
    closeDeleteItem() {
      this.data = {};
      this.$emit("getPosts");
      this.isDeleteItem = false;
    },
    goAccount() {
      this.$router.push({
        name: "AuthMyAccount",
        params: { username: this.data.students.accounts[0].username },
      });
    },
    submit() {
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/post/" +
            this.data.id +
            "/comment/add",
          {
            text: this.comment,
          },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$emit("getPosts");
          this.comment = null;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>