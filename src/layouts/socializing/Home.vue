<!-- eslint-disable prettier/prettier -->
<template>
  <v-app>
    <v-app-bar app flat color="white" align-center>
      <v-text-field
        background-color="grey lighten-4"
        solo
        flat
        rounded
        dense
        hide-details
        label="Search Ceylonuni"
        prepend-inner-icon="mdi-magnify"
      />
      <v-divider vertical inset class="mx-3" />

      <v-btn elevation="0" small text rounded class="text-capitalize">
        <v-icon small color="grey darken-1"> mdi-account-group </v-icon>
        socializing
      </v-btn>
      <v-btn elevation="0" small text rounded class="text-capitalize">
        <v-icon small color="grey darken-1"> mdi-calendar-star </v-icon>
        events
      </v-btn>
      <v-btn elevation="0" small text rounded class="text-capitalize">
        <v-icon small color="grey darken-1"> mdi-bookshelf </v-icon>
        Study area
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar tile>
          <v-img :src="require('@/assets/logo_sm.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="teal--text text-h6">
          Ceylonuni
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item link>
          <v-list-item-icon v-if="mini">
            <v-icon>mdi-lightning-bolt</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-if="!mini">
            <v-btn small color="primary" @click="createPost" dark
              ><v-icon left> mdi-lightning-bolt </v-icon> Create Post
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex">
      <v-container fill-height>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
    <!-- dialogs -->
    <DialogCreatePost v-if="isCreatePost" :callbackClose="closeCreatePost" />
  </v-app>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  components: {
    DialogCreatePost: () =>
      import(
        /* webpackChunkName: "component-socializing-create-post" */ "@/components/socializing/Post/DialogAddPost"
      ),
  },
  data: () => ({
    drawer: true,
    isCreatePost: false,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mini: false,
  }),
  methods: {
    createPost() {
      this.isCreatePost = true;
    },
    closeCreatePost(){
      this.isCreatePost = false
    }
  },
};
</script>
