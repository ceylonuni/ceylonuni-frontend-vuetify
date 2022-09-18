<template>
  <v-card
    min-height="300"
    :color="colors[Math.floor(Math.random() * 10)]"
    class="
      d-flex
      justify-center
      align-center
      text-h4
      font-weight-bold
      white--text
      rounded-sm rounded-b-0
      text-center
    "
    flat
    tile
  >
    {{ data }}
  </v-card>
</template>
<script>
export default {
  props: ["data"],
  data: () => ({
    colors: [
      "#7D9D9C",
      "#E4DCCF",
      "#DF7861",
      "#6D8B74",
      "#AC7D88",
      "#4D4C7D",
      "#827397",
      "#94B49F",
      "#E5DF88",
      "#625261",
    ],
  }),
};
</script>