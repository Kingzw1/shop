import service from "./index";
export const login = ({ username, password }) => {
  return service({
    method: "post",
    url: "/login",
    data: {
      username,
      password,
    },
  });
};
