<template>
  <v-row>
    <v-col class="flex-grow-1 flex-shrink-0">
      <Timeline />
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-0">
      <div style="width: 300px">
        <div class="d-flex" style="position: fixed; right: 0">
          <v-divider vertical class="mx-3" />
          <Chats />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    Timeline: () =>
      import(
        /* webpackChunkName: "component-socializing-timeline" */ "@/components/socializing/Timeline"
      ),
    Chats: () =>
      import(
        /* webpackChunkName: "component-socializing-timeline" */ "@/components/socializing/Chats"
      ),
  },
};
</script>
