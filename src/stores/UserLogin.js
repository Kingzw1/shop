import { defineStore } from "pinia";
import { ref } from "vue";
import { login } from "@/api/LoginApi";

export const useLogin = defineStore("login", () => {
  const LoginList = ref({});
  async function UserLogin({ username, password }) {
    try {
      const res = await login({ username, password });
      LoginList.value = res.data;

      // 存储到 localStorage，使用 JSON.stringify 将对象转换为字符串
      localStorage.setItem("LoginList", JSON.stringify(LoginList.value));
    } catch (error) {
      console.error("Login failed", error);
    }
  }
  return { UserLogin, LoginList };
});
