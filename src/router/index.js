import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "layout-socializing-timeline" */ "@/layouts/socializing/Home"
      ),
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
        name: "SocializingHome",
        component: () =>
          import(
            /* webpackChunkName: "view-auth-entry" */ "@/views/auth/Entry"
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
