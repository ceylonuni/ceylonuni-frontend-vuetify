<!-- eslint-disable prettier/prettier -->
<template>
  <v-card class="mx-auto" max-width="600">
    <v-img
    v-if="data && data.image_url"
      class="white--text align-end"
      max-height="500px"
      contain
      :src="data.image_url"
    >
      <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
    </v-img>

    <v-card-subtitle class="pb-0">Post by : {{data.students.first_name}} | {{data.created_at}} </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{data.text}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text> Share </v-btn>

      <v-btn color="orange" text> Explore </v-btn>
    </v-card-actions>
  </v-card>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  props:["data"]
};
</script>