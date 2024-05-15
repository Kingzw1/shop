import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 首页
    {
      path: "/",
      name: "home",
      component: Home,
    },
    // 登录页
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
  ],
});

export default router;
