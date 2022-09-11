<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h3
          class="display-2 font-weight-bold mb-3 blue-grey--text text--lighten-4"
        >
          Welcome to Ceylonuni
        </h3>

        <p
          class="subheading font-weight-regular blue-grey--text text--lighten-2 text-h5"
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
