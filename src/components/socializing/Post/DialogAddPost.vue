<!-- eslint-disable prettier/prettier -->
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5"> Create post </v-card-title>
        <v-card-text>
          <v-textarea
            filled
            auto-grow
            label="Content"
            rows="4"
            row-height="30"
            shaped
            v-model="text"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="closeDialog">
            Close
          </v-btn>

          <v-btn color="green darken-1" text @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
const axios = require("axios").default;
import { mapState } from 'vuex'
export default {
  props: ["callbackClose"],
  components: {
    // Post: () =>
    //   import(
    //     /* webpackChunkName: "component-socializing-post" */ "@/components/socializing/Post/AbstractPost"
    //   ),
  },
  computed: mapState({
			auth: state => state.auth.data,
		}),
  data() {
    return {
      dialog: true,
      text: null,
      token:null
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
    submit() {
      axios
        .post(
          "http://localhost:3000/api/socializing/post/add",
          {
            text: this.text,
          },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
         this.closeDialog()
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>