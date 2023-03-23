/* eslint-disable no-console */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import _ from "lodash";

Vue.config.productionTip = false;
var api = {
  servers: {
    auth: process.env.VUE_APP_URL_API_AUTH,
    event: process.env.VUE_APP_URL_API_EVENT,
    socializing: process.env.VUE_APP_URL_API_SOCIALIZING,
  },
};
Vue.prototype.$api = api;
Vue.prototype.$_ = _;
Vue.component("ReportDialog", () => import(/* webpackChunkName: "component-report-dialog" */ "@/components/Report/ReportDialog.vue"));
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
/* eslint-disable no-console */
