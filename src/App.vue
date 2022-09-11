<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
::selection {
  color: #fff;
  background: rgba(0, 130, 100, 0.7);
}
/* For Mozilla Firefox */
::-moz-selection {
  color: #fff;
  background: rgba(0, 130, 100, 0.7);
}
</style>
