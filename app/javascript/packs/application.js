import Vue from "vue/dist/vue.js"; //defined path here instead of using alias in development.js
import App from "../app.vue";
import router from "../router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);
import VueSession from "vue-session";
Vue.use(VueSession);
import "font-awesome/css/font-awesome.css";
var options = {
  persist: true
};

Vue.use(VueSession, options);
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "babel-core/register";
import "babel-polyfill";

import Autocomplete from "v-autocomplete";

import "v-autocomplete/dist/v-autocomplete.css";

Vue.use(Autocomplete);

let token = document.getElementsByName("csrf-token")[0].getAttribute("content");
axios.defaults.headers.common["X-CSRF-Token"] = token;
axios.defaults.headers.common["Accept"] = "application/json";

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
