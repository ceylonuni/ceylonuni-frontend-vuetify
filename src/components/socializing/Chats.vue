<template>
  <div
    style="overflow-y: auto; max-height: calc(100vh - 100px)"
  >
    <v-skeleton-loader
      v-for="i in 15"
      :key="i"
      width="300"
      type="list-item-avatar-two-line"
    ></v-skeleton-loader>
  </div>
</template>
<script>
export default {
  data: () => ({
    //
  }),
};
</script>