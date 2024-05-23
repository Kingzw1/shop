<template>
  <div class="main">
    <!-- 面包屑 -->
    <div class="navigation">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账号列表</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容区域 -->
    <div class="pages-main">
      <div class="pages">
        <div class="input-search">
          <el-input
            v-model="userData.keyWord"
            style="max-width: 600px"
            placeholder="Please input"
            class="input-with-select"
          >
            <template #append>
              <el-button @click="searchUser"
                ><el-icon><Search /></el-icon
              ></el-button>
            </template>
          </el-input>
          <el-button type="primary" class="add-user" @click="addUser"
            >新建用户</el-button
          >
        </div>
        <div></div>
      </div>
      <div class="table">
        <el-table :data="userListViews" stripe style="width: 100%">
          <el-table-column prop="username" label="姓名" width="180" />
          <el-table-column prop="email" label="邮箱" width="180" />
          <el-table-column prop="mobile" label="电话" />
          <el-table-column prop="role_name" label="角色" />
          <el-table-column prop="mg_state" label="状态">
            <template #default="scope">
              <el-switch
                v-model="scope.row.mg_state"
                class="ml-2"
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" id="center">
            <template #default="scope">
              <el-button type="primary">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserList } from "@/stores/UserList.js";
const userList = useUserList();
const userData = ref({
  keyWord: "",
  searchParams: {
    query: "",
    pagenum: 1,
    pagesize: 5,
  },
});
onMounted(async () => {
  await userList.getUserList(userData.value.searchParams);
  console.log(userList.userListStore.data.users);
});
const searchUser = async () => {
  await userList.getUserList(userData.searchParams);
};
const userListViews = computed(() => {
  return userList.userListStore.data?.users || [];
});
const addUser = () => {};
</script>

<style scoped>
.main {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
}
.pages {
  /* width: 500px; */
  padding-top: 30px;
}
.input-search {
  display: flex;
  /* flex-direction: column; */
  /* padding-top: 20px; */
}
.add-user {
  margin-left: 20px;
}
.pages-main {
  height: 100%;
  overflow-y: auto;
}
::v-deep .el-table_1_column_6 > .cell {
  text-align: center; /* 使用 !important 来确保优先级最高 */
}
</style>