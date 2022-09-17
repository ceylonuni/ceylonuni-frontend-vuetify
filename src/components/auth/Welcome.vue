<template>
  <v-container>
    <v-row class="text-center">
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
          style="max-width: 300px; margin: auto;"
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
  data: () => ({
    //
  }),
};
</script>
