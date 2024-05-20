import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
const service = axios.create({
  baseURL: "http://127.0.0.1:8888/api/private/v1/",
  timeout: 5000,
});
service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    nProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done();
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
// 对外暴露
export default service;
