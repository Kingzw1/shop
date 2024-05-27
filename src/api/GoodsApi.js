import service from "./index";
export const goodList = (params) => {
  return service({
    method: "get",
    url: "/goods",
    params,
  });
};
