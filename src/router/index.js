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
  ],
});

// router.beforeEach((to, from, next) => {
//   // ...
//   // 返回 false 以取消导航
//   // return true;
//   const LoginList = JSON.parse(localStorage.getItem("LoginList"));
//   // console.log(LoginList.data.token);
//   if (to.name !== "login" && !LoginList?.data.token) {
//     // 如果访问的不是登录页面且没有 token，则跳转到登录页面
//     next({ path: "/login" });
//     // next();
//   } else {
//     // 其他情况下，允许访问
//     if (to.name === "login") {
//       next({ path: "/" });
//     } else {
//       next();
//     }
//     // next();
//   }
// });
router.beforeEach((to, from, next) => {
  const loginData = localStorage.getItem("LoginList");
  const LoginList = loginData ? JSON.parse(loginData) : null;

  if (!LoginList || !LoginList.data?.token) {
    // 如果未登录，尝试访问非登录页面时，重定向到登录页面
    if (to.name !== "login") {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    // 如果已登录，尝试访问登录页面时，重定向到主页
    if (to.name === "login") {
      next({ name: "home" });
    } else {
      next();
    }
  }
});
export default router;
