<template>
  <div class="login">
    <div class="login-box">
      <el-form
        ref="formRef"
        style="max-width: 600px"
        :model="LoginData"
        label-width="auto"
        class="demo-dynamic"
        :rules="rules"
      >
        <el-form-item prop="username" label="用户名">
          <el-input type="text" v-model="LoginData.username" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="LoginData.password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login_but" @click="ButLogin(formRef)"
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
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 12,
      message: "用户名长度应在 3 到 12 个字符之间",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (!/^[a-zA-Z]+$/.test(value)) {
          callback(new Error("用户名只能包含字母"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "密码长度应在 6 到 18 个字符之间",
      trigger: "blur",
    },
  ],
};
const LoginData = reactive({
  username: "",
  password: "",
});
// async function ButLogin() {
//   console.log("%%%", router);
//   await LoginStore.UserLogin(LoginData);
//   router.push("/");
// }
const ButLogin = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        await LoginStore.UserLogin(LoginData);
        if (LoginStore.LoginList.meta.status == 200) {
          alert(LoginStore.LoginList.meta.msg);
          router.push("/");
        } else {
          alert(LoginStore.LoginList.meta.msg);
        }
      } catch (error) {
        alert(LoginStore.LoginList.meta.msg);
        console.error("Error during login:", error);
      }
    } else {
      alert("请输入用户名和密码!", fields);
    }
  });
};
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