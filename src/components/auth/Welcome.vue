<template>
  <v-container>
    <v-row class="text-center" v-if="direction == 'vertical'">
      <v-col cols="12" class="pb-0">
        <v-img
          :src="require('@/assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4 pt-0">
        <p
          style="max-width: 300px; margin: auto"
          class="font-weight-regular blue-grey--text text--lighten-2"
        >
          Ceylonuni helps you connect and share with the people in your
          university life
        </p>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="d-flex align-end">
        <v-img
          :src="require('@/assets/logo.png')"
          class="my-3"
          max-width="80"
        />
        <v-divider vertical class="mx-3"></v-divider>
        <p
          style="max-width: 300px"
          class="font-weight-regular blue-grey--text text--lighten-2"
        >
          Ceylonuni helps you connect and share with the people in your
          university life
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    direction: {
      default: "vertical",
      type: String,
    },
  },
  data: () => ({
    //
  }),
};
</script>
