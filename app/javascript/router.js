import Vue from "vue/dist/vue.js";
import Router from "vue-router";
import Main from "components/articles/list.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [{ path: "/list", name: "blog", component: Main }]
});

export default router;
