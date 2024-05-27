import { defineStore } from "pinia";
import { getRole } from "@/api/RoleLIstApi";
import { ref } from "vue";
export const useRoleList = defineStore("RoleList", () => {
  const tableData = ref({});
  const getRoleList = async () => {
    try {
      const res = await getRole();
      console.log("%%%%%%%", res);

      tableData.value = res.data;
      console.log(")))", tableData.value.data);
    } catch (error) {
      console.log("获取角色列表失败", error);
    }
  };
  return { tableData, getRoleList };
});
