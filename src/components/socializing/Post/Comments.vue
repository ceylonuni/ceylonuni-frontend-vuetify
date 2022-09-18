<template>
  <div class="mx-5">
    <div class="d-flex align-center">
      <v-avatar color="teal" size="40">
        <span class="white--text text-h6"> PK </span>
      </v-avatar>
      <v-card class="ml-2 py-3 px-5" flat color="grey lighten-4" rounded="xl">
        <div class="font-weight-medium text-caption grey--text text--darken-2">
          First and last name
        </div>
        <div class="text-caption">
          Comment comes here "Machan saapadu than mukkiyam, diet aavathu
          mayiraaavathu" !
        </div>
      </v-card>
    </div>
    <v-divider class="my-3" />
    <div class="d-flex">
      <v-text-field
        background-color="grey lighten-4"
        solo
        flat
        rounded
        dense
        hide-details
        label="Add your comments..."
      />
      <v-btn elevation="0" icon>
        <v-icon color="grey darken-1"> mdi-send </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
};
</script>