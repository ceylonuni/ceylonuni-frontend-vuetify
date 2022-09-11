<template>
  <Welcome msg="Welcome to Your Vue.js App" />
</template>

<script>
export default {
  name: "Home",
  components: {
    Welcome: () => import("@/components/socializing/Welcome"),
  },
};
</script>
