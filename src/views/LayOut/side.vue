<template>
  <h2 @click="toHome">首页</h2>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#ffffff"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><User /></el-icon>
        <span>账号管理</span>
      </template>

      <el-menu-item index="1-1" @click="user">账号列表</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#ffffff"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><CreditCard /></el-icon>
        <span>角色管理</span>
      </template>

      <el-menu-item index="1-1" @click="UserRole">角色列表</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import router from "@/router";
function user() {
  router.push("user");
}
function toHome() {
  router.push("main");
}
function UserRole() {
  router.push("role");
}
</script>

<style scoped>
h2 {
  padding-top: 10px;
  text-align: center;
}
h2:hover {
  cursor: pointer;
}
</style>