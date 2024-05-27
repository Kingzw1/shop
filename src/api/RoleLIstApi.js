import service from "./index";
// 获取角色列表
export const getRole = () => {
  return service({
    mmethod: "get",
    url: "/roles",
  });
};
// 添加角色
export const addRoleApi = (data) => {
  return service({
    method: "post",
    url: "/roles",
    data,
  });
};
// 编辑角色
export const setRoleApi = (data) => {
  return service({
    method: "put",
    url: `/roles/${data.id}`,
    data: {
      roleName: data.roleName,
      roleDesc: data.roleDesc,
    },
  });
};
// 删除角色
export const deleteRoleApi = (id) => {
  return service({
    method: "delete",
    url: `/roles/${id}`,
  });
};
