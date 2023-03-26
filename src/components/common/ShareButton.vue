<template>
  <v-menu bottom origin="center center" transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon large color="grey" class="mx-1" v-bind="attrs" v-on="on">
        <v-icon>mdi-share-outline</v-icon>
      </v-btn>
    </template>
    <v-list>
      <ShareNetwork
        class="text-decoration-none"
        network="facebook"
        :title="title"
        :url="url"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-facebook</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Facebook</v-list-item-title>
        </v-list-item>
      </ShareNetwork>
      <ShareNetwork
        class="text-decoration-none"
        network="whatsapp"
        :title="title"
        :url="url"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-whatsapp</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Whatsapp</v-list-item-title>
        </v-list-item>
      </ShareNetwork>
      <ShareNetwork
        class="text-decoration-none"
        network="linkedIn"
        :url="url"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-linkedin</v-icon>
          </v-list-item-icon>
          <v-list-item-title>LinkedIn</v-list-item-title>
        </v-list-item>
      </ShareNetwork>
    </v-list>
  </v-menu>
</template>
  
  <script>
import VueSocialSharing from "vue-social-sharing";
import Vue from "vue";
Vue.use(VueSocialSharing);
export default {
  components: {},
  props: ["url"],
  data: () => ({
    title : null
  }),
  watch: {},
  created() {
    this.title = document.title;
  },
};
</script>
  