<template>
  <div class="about">
   Logout
  </div>
</template>
<script>
  export default {
    components: {
    },
    created() {
      this.$store.dispatch('logout')
    },
    mounted() {
      this.$router.push({name:'AuthEntry'})
    },
  };
  </script>
