
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5"> Report </v-card-title>
        <v-card-text>
          <div>
            <v-textarea
              filled
              auto-grow
              label="Reason"
              rows="4"
              row-height="30"
              shaped
              v-model="text"
            ></v-textarea>
          </div>
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

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  props: ["callbackClose", "model", "model_id", "data"],
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
      dialog: true,
      text: null,
      token: null,
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
          `${this.$api.servers.socializing}/report/add`,
          {
            model_id: this.model_id,
            reason: this.text,
            model: this.model,
            data: JSON.stringify(this.data),
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
  },
};
</script>