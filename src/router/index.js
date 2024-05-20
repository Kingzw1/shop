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
      redirect: "/main",
      children: [
        {
          path: "main",
          name: "main",
          component: () => import("../views/LayOut/main.vue"),
        },
        {
          path: "user",
          name: "user",
          component: () => import("../views/User/user.vue"),
        },
        {
          path: "role",
          name: "role",
          component: () => import("../views/User/role.vue"),
        },
      ],
    },
    // 登录页
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    // {
    //   path: "/home",
    //   name: "mainHome",
    //   component: Home,
    // },
  ],
});

// router.beforeEach((to, from, next) => {
//   // ...
//   // 返回 false 以取消导航
//   // return true;
//   next();
// });
export default router;
