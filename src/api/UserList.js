import service from "./index";
// 获取用户列表
export const userList = (data) => {
  return service({
    method: "get",
    url: "/users",
    params: {
      query: data.query,
      pagenum: data.pagenum,
      pagesize: data.pagesize,
    },
  });
};

// 添加用户列表信息
export const addUserListApi = (data) => {
  return service({
    method: "post",
    url: "/users",
    data,
  });
};

// 用户状态管理
export const UserTypeApi = (uId, type) => {
  return service({
    method: "put",
    url: `users/${uId}/state/${type}`,
  });
};

// 编辑用户列表
export const UserSetListApi = (data) => {
  return service({
    method: "put",
    url: `users/${data.id}`,
    data,
  });
};

// 删除用户信息
export const deleteUserApi = (id) => {
  return service({
    method: "delete",
    url: `users/${id}`,
  });
};
