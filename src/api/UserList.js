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
