import { defineStore } from "pinia";
import { ref } from "vue";
import { login } from "@/api/LoginApi";

export const useLogin = defineStore("login", () => {
  const LoginList = ref({});
  async function UserLogin({ username, password }) {
    const res = await login({ username, password });
    LoginList.value = res.data;
  }
  return { UserLogin, LoginList };
});
