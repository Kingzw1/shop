<template>
  <div class="head">
    <div class="logo">
      <img src="../../assets/images/logo.jpg" alt="" />
      <h3>管理系统</h3>
    </div>
    <div class="but">
      <el-button color="#626aef" :dark="isDark" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
console.log(router);
function login() {
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