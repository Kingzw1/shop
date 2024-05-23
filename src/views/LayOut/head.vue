<template>
  <div class="head">
    <div class="logo">
      <img src="../../assets/images/logo.jpg" alt="" />
      <h3>管理系统</h3>
    </div>
    <div class="but">
      <span> 用户:{{ LoginList.data.username }} </span>
      <el-button
        style="margin-left: 10px"
        color="#626aef"
        :dark="isDark"
        @click="login"
        >登录</el-button
      >
      <el-button type="primary" @click="outLogin">退出</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const LoginList = JSON.parse(localStorage.getItem("LoginList"));
function login() {
  if (LoginList?.data.token) {
    alert("请先退出登录然后再重新登录!");
  } else {
    router.push("login");
  }
}
function outLogin() {
  localStorage.removeItem("LoginList");
  router.push("login");
}
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  height: 70px;
}
img {
  height: 100%;
}
.logo {
  display: flex;
  justify-content: flex-start;
}
.logo > h3 {
  line-height: 70px;
  padding-left: 10px;
}
.but {
  margin-right: 40px;
  line-height: 70px;
}
</style>