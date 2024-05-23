import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { userList } from "@/api/UserList.js";
export const useUserList = defineStore("UserList", () => {
  const userListStore = ref([]);
  const getUserList = async (userData) => {
    try {
      const res = await userList(userData);
      userListStore.value = res.data;
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };
  return { getUserList, userListStore };
});
