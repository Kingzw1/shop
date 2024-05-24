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
