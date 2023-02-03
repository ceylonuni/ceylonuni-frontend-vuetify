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
        path: "people",
        name: "SocializingPeople",
        component: () =>
          import(
            /* webpackChunkName: "view-socializing-people" */ "@/views/socializing/People"
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
        path: "account/:username",
        name: "AuthMyAccount",
        component: () =>
          import(
            /* webpackChunkName: "view-auth-account" */ "@/views/auth/Account"
          ),
      },
    ],
  },
  {
    path: "/events",
    component: () =>
      import(
        /* webpackChunkName: "layout-socializing-timeline" */ "@/layouts/event/Home"
      ),
    beforeEnter: multiguard([loggedIn]),
    children: [
      {
        path: "all",
        name: "EventHome",
        component: () =>
          import(
            /* webpackChunkName: "view-event-home" */ "@/views/event/Home"
          ),
      },
      {
        path: "your",
        name: "YourEvent",
        component: () =>
          import(
            /* webpackChunkName: "view-event-your" */ "@/views/event/Your"
          ),
      },
      {
        path: "interested",
        name: "YourInterestedEvent",
        component: () =>
          import(
            /* webpackChunkName: "view-event-your" */ "@/views/event/Interested"
          ),
      },
      {
        path: "collborated",
        name: "YourCollboratedEvent",
        component: () =>
          import(
            /* webpackChunkName: "view-event-collborated" */ "@/views/event/Collborated"
          ),
      },
      {
        path: "new",
        name: "NewEvent",
        component: () =>
          import(
            /* webpackChunkName: "view-event-New" */ "@/views/event/New"
          ),
      },
      {
        path: ":key",
        name: "EventRead",
        component: () =>
          import(
            /* webpackChunkName: "view-event-read" */ "@/views/event/Read"
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
