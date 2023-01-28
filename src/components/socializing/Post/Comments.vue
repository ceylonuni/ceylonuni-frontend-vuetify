<template>
  <div class="mx-5">
    <div @click="goAccount()" class="d-flex align-center pb-3" v-for="(comment,i) in data.comments" :key="i">
      <v-avatar color="teal" size="40">
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
        <div class="font-weight-medium text-caption grey--text text--darken-2">
          {{comment.students.first_name}} {{comment.students.last_name}}
        </div>
        <div class="text-caption">
         {{comment.text}}
        </div>
        <div class="text-right" style="font-size:10px">
            {{ $moment(comment.created_at).fromNow() }}
          </div>
      </v-card>
    </div>
    <v-divider  class="my-3" v-if="data.comments.length !=0" />
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
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  methods:{
    goAccount(){
     this.$router.push({name:'AuthMyAccount',params:{username:this.data.students.accounts[0].username}})
    },
    submit() {
      axios
        .post(
          "http://localhost:3002/api/socializing/v1/post/"+this.data.id+"/comment/add",
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
          this.$emit('getPosts')
          this.comment = null
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>