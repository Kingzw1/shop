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
          prop="username"
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
          <el-input type="text" v-model="LoginData.username" />
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
      <el-button type="primary" class="login_but" @click="ButLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useLogin } from "../stores/UserLogin";
const LoginStore = useLogin();
const router = useRouter();
const formRef = ref();
const LoginData = reactive({
  username: "",
  password: "",
});
async function ButLogin() {
  console.log("%%%", router);
  await LoginStore.UserLogin(LoginData);
  router.push("/");
}
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