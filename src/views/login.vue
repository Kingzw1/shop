<template>
  <div class="login">
    <div class="login-box">
      <el-form
        ref="formRef"
        style="max-width: 600px"
        :model="LoginData"
        label-width="auto"
        class="demo-dynamic"
      >
        <el-form-item
          prop="useName"
          label="用户名"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input type="text" v-model="LoginData.useName" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input type="password" v-model="LoginData.password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login_but">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formRef = ref();
const LoginData = reactive({
  useName: "",
  password: "",
});
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: aqua;
  position: relative;
}
.login-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 350px;
  padding: 50px 45px;
  border-radius: 20px;
}
.login_but {
  display: block;
  margin: 0 auto;
}
</style>