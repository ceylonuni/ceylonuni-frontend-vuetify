<template>
    <v-img
    v-if="data"
      class="white--text align-end"
      max-height="500px"
      contain
      :src="data"
    >
    </v-img>
</template>
<script>
export default {
  props:["data"]
};
</script>