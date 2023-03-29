/* eslint-disable no-console */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import _ from "lodash";

Vue.config.productionTip = false;
var app_url = process.env.VUE_APP_URL;
var api = {
  servers: {
    auth: process.env.VUE_APP_URL_API_AUTH,
    event: process.env.VUE_APP_URL_API_EVENT,
    socializing: process.env.VUE_APP_URL_API_SOCIALIZING,
  },
};
Vue.prototype.$app_url = app_url;
Vue.prototype.$api = api;
Vue.prototype.$_ = _;
Vue.component("Error", () => import(/* webpackChunkName: "component-error" */ "@/components/common/Error.vue"));
Vue.component("DeleteDialog", () => import(/* webpackChunkName: "component-delete-dialog" */ "@/components/common/DeleteDialog.vue"));
Vue.component("ReportDialog", () => import(/* webpackChunkName: "component-report-dialog" */ "@/components/common/ReportDialog.vue"));
Vue.component("ShareButton", () => import(/* webpackChunkName: "component-share-button" */ "@/components/common/ShareButton.vue"));
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
/* eslint-disable no-console */
