import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store/index"
import multiguard from 'vue-router-multiguard';
Vue.use(VueRouter);

const loggedIn = function(to, from, next) {
  if (!store.state.auth.data.token) next({ name: 'AuthEntry' })
  next();
}

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
    ],
  },
  {
    path: "/logout",
    component: () =>
      import(
        /* webpackChunkName: "layout-auth-logout" */ "@/layouts/auth/Entry"
      ),
    children: [
      {
        path: "",
        name: "AuthLogout",
        component: () =>
          import(
            /* webpackChunkName: "view-auth-logout" */ "@/views/auth/Logout"
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
