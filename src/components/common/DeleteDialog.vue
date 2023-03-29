
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5"> Delete {{ type }} </v-card-title>
        <v-card-text>
          <div>
           Do you want to delete this {{ type }}?
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="submit"> Yes </v-btn>
          <v-btn color="green darken-1" text @click="closeDialog">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  props: ["callbackClose", "type", "url","id"],
  components: {
   
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
          this.url,
          {
            id: this.id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if(this.type == "post"){
              this.$router.go(-1);
          } else {
             this.closeDialog();
          }
         
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>