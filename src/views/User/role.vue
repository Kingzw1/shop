<template>
  <div class="main">
    <!-- 面包屑 -->
    <div class="navigation">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容区域 -->
    <div class="pages-main">
      <div class="pages">
        <el-button type="primary" @click="dialogFormVisible = true"
          >新建角色</el-button
        >
      </div>
      <div class="table">
        <el-table :data="roleList.tableData.data" style="width: 100%">
          <el-table-column
            label="角色名"
            prop="roleName"
            width=""
          ></el-table-column>
          <el-table-column
            label="角色描述"
            prop="roleDesc"
            width=""
          ></el-table-column>
          <el-table-column label="操作" width="">
            <template #default="scope">
              <el-button type="primary" @click="setRole(scope.row.id)"
                >编辑</el-button
              >
              <el-button type="danger" @click="deleteRole(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新建角色 -->
    <el-dialog v-model="dialogFormVisible" title="新建角色" width="500">
      <!-- 参数名	参数说明	备注
      roleName	角色名称	不能为空
      roleDesc	角色描述	可以为空 -->
      <el-form
        :model="addFormData"
        :rules="rules"
        label-width="auto"
        ref="ruleFormRef"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input
            v-model="addFormData.roleName"
            placeholder="请输入角色名"
            type="text"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            v-model="addFormData.roleDesc"
            placeholder="请输入角色描述"
            type="text"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addRole(ruleFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog v-model="visible" title="编辑角色" width="600px">
      <el-form :model="setRoleOne" :rules="rules" label-width="auto">
        <el-form-item label="角色名" prop="roleName">
          <el-input
            v-model="setRoleOne.roleName"
            placeholder="请输入电子邮箱"
            type="text"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="roleDesc">
          <el-input
            type="text"
            v-model="setRoleOne.roleDesc"
            placeholder="请输入手机号码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="sendRole">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useRoleList } from "@/stores/roleList";
import { onMounted, ref } from "vue";
import { addRoleApi, setRoleApi, deleteRoleApi } from "@/api/RoleLIstApi";
const roleList = useRoleList();
onMounted(async () => {
  try {
    await roleList.getRoleList();
  } catch (error) {
    console.log("获取角色列表失败", error);
  }
});
// 新建角色
const dialogFormVisible = ref(false);
const addFormData = ref({
  roleName: "",
  roleDesc: "",
});
const addRole = async () => {
  try {
    await addRoleApi(addFormData.value);
    await roleList.getRoleList();
  } catch (error) {
    console.log("添加失败", error);
  }
  dialogFormVisible.value = false;
};
// 编辑角色
const visible = ref(false);
const setRoleOne = ref({
  id: "",
  roleName: "",
  roleDesc: "",
});
const setRole = (id) => {
  const res = roleList.tableData.data.filter((item) => item.id == id);
  setRoleOne.value.id = id;
  setRoleOne.value.roleName = res[0].roleName;
  setRoleOne.value.roleDesc = res[0].roleDesc;
  visible.value = true;
};
const sendRole = async () => {
  try {
    await setRoleApi(setRoleOne.value);
    await roleList.getRoleList();
    visible.value = false;
  } catch (error) {
    console.log("编辑失败", error);
  }
};
// 删除角色
const deleteRole = async (id) => {
  try {
    await deleteRoleApi(id);
    await roleList.getRoleList();
  } catch (error) {
    console.log("删除失败", error);
  }
};
</script>

<style scoped>
.main {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 74px); /* 根据需要调整高度 */
  overflow-y: auto;
  padding: 20px;
}
.pages {
  /* width: 500px; */
  padding-top: 30px;
}
::v-deep .el-table_1_column_3 > .cell {
  text-align: center !important; /* 使用 !important 来确保优先级最高 */
}
</style>