import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store/index";
import multiguard from "vue-router-multiguard";
Vue.use(VueRouter);

const loggedIn = function (to, from, next) {
  if (!store.state.auth.data.token) next({ name: "AuthEntry" });
  next();
};

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "layout-socializing-timeline" */ "@/layouts/socializing/Home"
      ),
    beforeEnter: multiguard([loggedIn]),
    children: [
      {
        path: "",
        name: "SocializingHome",
        component: () =>
          import(
            /* webpackChunkName: "view-socializing-home" */ "@/views/socializing/Home"
          ),
      },
      {
        path: "search",
        name: "SearchResults",
        component: () =>
          import(
            /* webpackChunkName: "view-socializing-search" */ "@/views/socializing/Search"
          ),
      },
      {
        path: "people",
        name: "People",
        component: () =>
          import(
            /* webpackChunkName: "view-socializing-search" */ "@/views/socializing/People"
          ),
      },
    ],
  },
  {
    path: "/entry",
    component: () =>
      import(
        /* webpackChunkName: "layout-auth-entry" */ "@/layouts/auth/Entry"
      ),
    children: [
      {
        path: "",
        name: "AuthEntry",
        component: () =>
          import(
            /* webpackChunkName: "view-auth-entry" */ "@/views/auth/Entry"
          ),
      },
      {
        path: "logout",
        name: "AuthLogout",
        component: () =>
          import(
            /* webpackChunkName: "view-auth-logout" */ "@/views/auth/Logout"
          ),
      },
      {
        path: "register",
        name: "AuthRegister",
        component: () =>
          import(
            /* webpackChunkName: "view-auth-register" */ "@/views/auth/Register"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
