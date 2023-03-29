
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px" class="rounded-xl">
      <v-card>
        <v-card-title class="text-h5 teal--text"> Create post </v-card-title>
        <v-card-text>
          <div>
            <v-textarea
              filled
              auto-grow
              label="Content"
              rows="4"
              row-height="30"
              v-model="text"
            ></v-textarea>
          </div>
          <div>
            <v-file-input
              @change="onFileChange"
              label="File input"
              filled
              :prepend-icon="null"
              prepend-inner-icon="mdi-camera"
            ></v-file-input>
          </div>
          <div class="text-center" v-if="previewImage">
            <v-img
              class="ml-auto mr-auto"
              contain
              max-height="150"
              max-width="250"
              :src="previewImage"
            ></v-img>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="teal darken-1" text @click="closeDialog">
            Close
          </v-btn>

          <v-btn  :loading="isLoading" color="teal darken-1" text @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  props: ["callbackClose"],
  components: {
    // Post: () =>
    //   import(
    //     /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/Post/AbstractPost"
    //   ),
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  data() {
    return {
      previewImage: null,
      dialog: true,
      text: null,
      token: null,
      image:null,
      isLoading: false
    };
  },

  methods: {
    closeDialog() {
      this.dialog = false;
      setTimeout(() => {
        this.callbackClose();
        this.dialog = true;
      }, 800);
    },

    onFileChange(file) {
      if (file) {
        this.previewImage = URL.createObjectURL(file);
        const reader = new FileReader();
        var i = this
        reader.onloadend = () => {
          i.image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = null;
      }
    },
    submit() {
      this.isLoading = true
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/post/add",
          {
            text: this.text,
            image_url:this.image
          },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.isLoading = false
          this.closeDialog();
        })
        .catch((error) => {
          this.isLoading = false
          console.log(error);
        });
    },
  },
};
</script>