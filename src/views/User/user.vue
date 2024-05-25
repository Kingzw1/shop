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
                @click="UserState(scope.row.id, scope.row.mg_state)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" id="center">
            <template #default="scope">
              <el-button type="primary" @click="setUser(scope.row.id)"
                >编辑</el-button
              >
              <el-button type="danger" @click="deleteUser(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新建用户 -->
    <el-dialog v-model="dialogFormVisible" title="新建用户" width="500">
      <!-- 参数名	参数说明	备注
        username	用户名称	不能为空
        password	用户密码	不能为空
        email	邮箱	可以为空
        mobile	手机号	可以为空 -->
      <el-form
        :model="addFormData"
        :rules="rules"
        label-width="auto"
        ref="ruleFormRef"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model="addFormData.username"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            v-model="addFormData.password"
            placeholder="请输入用户密码"
            type="password"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="addFormData.email"
            placeholder="请输入电子邮箱"
            type="email"
          />
        </el-form-item>
        <el-form-item type="number" label="手机号" prop="mobile">
          <el-input v-model="addFormData.mobile" placeholder="请输入手机号码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addUserList(ruleFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog v-model="visible" title="修改用户" width="600px">
      <el-form :model="setUserOne" :rules="rules" label-width="auto">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="setUserOne.email"
            placeholder="请输入电子邮箱"
            type="email"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            type="number"
            v-model="setUserOne.mobile"
            placeholder="请输入手机号码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="confirmDialog">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserList } from "@/stores/UserList.js";
import {
  addUserListApi,
  UserTypeApi,
  UserSetListApi,
  deleteUserApi,
} from "@/api/UserList";
const userList = useUserList();
const userData = ref({
  keyWord: "",
  searchParams: {
    query: "",
    pagenum: 1,
    pagesize: 5,
  },
});
const dialogFormVisible = ref(false);
const addFormData = ref({
  username: "",
  password: "",
  email: "",
  mobile: "",
});
const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }, {}],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "密码长度应在 6 到 18 个字符之间",
      trigger: "blur",
    },
  ],
  email: [
    { type: "email", message: "请输入正确的邮件格式", trigger: "change" },
  ],
  mobile: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(); // 输入为空时，不进行任何验证
        } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的电话号码"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

onMounted(async () => {
  await userList.getUserList(userData.value.searchParams);
});
const searchUser = async () => {
  await userList.getUserList(userData.searchParams);
};
const userListViews = computed(() => {
  return userList.userListStore.data?.users || [];
});
const addUser = () => {
  dialogFormVisible.value = true;
};
const ruleFormRef = ref();
const addUserList = async (ruleFormRef) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate(async (valid, fields) => {
    if (valid) {
      try {
        await addUserListApi(addFormData.value);
        await userList.getUserList(userData.value.searchParams);
        ElMessage({
          message: "添加成功",
          type: "success",
        });
        dialogFormVisible.value = false;
      } catch (error) {
        console.log("添加用户失败", error);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 用户编辑
const visible = ref(false);
const setUserOne = ref({
  id: "",
  email: "",
  mobile: "",
});
const setUser = (id) => {
  visible.value = true;
  const rus = userListViews.value.filter((item) => item.id == id);
  setUserOne.value.email = rus[0].email;
  setUserOne.value.mobile = rus[0].mobile;
  setUserOne.value.id = id;
};
const confirmDialog = async () => {
  try {
    await UserSetListApi(setUserOne.value);
    await userList.getUserList(userData.value.searchParams);
  } catch (error) {
    console.log("error submit!", fields);
  }
  visible.value = false;
};
// 用户转态管理
const UserState = async (id, state) => {
  try {
    await UserTypeApi(id, state);
  } catch (error) {
    console.log("error submit!", fields);
  }
};
// 删除用户信息
const deleteUser = async (id) => {
  try {
    await deleteUserApi(id);
    await userList.getUserList(userData.value.searchParams);
  } catch (error) {
    console.log("error submit!", fields);
  }
};
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
  text-align: center !important; /* 使用 !important 来确保优先级最高 */
}
</style>