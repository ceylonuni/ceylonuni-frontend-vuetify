<template>
  <div>
    <v-btn @click="submit">Submit</v-btn>
    <v-file-input
      @change="onFileChange"
      label="File input"
      filled
      prepend-icon="mdi-camera"
    ></v-file-input>

    <div class="text-center" v-if="previewImage">
      <v-img
        class="ml-auto mr-auto"
        contain
        max-height="150"
        max-width="250"
        :src="previewImage"
      ></v-img>

      
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  data() {
    return {
      previewImage: null,
      image: null,
    };
  },
  methods:{
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
      axios
        .post(
          "http://localhost:3000/api/auth/v1/profile/image-upload",
          {
            image:this.image
          },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.closeDialog();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>

<style>
</style>