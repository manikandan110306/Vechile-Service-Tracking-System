import axiosClient from "./axiosClient";

const authApi = {
  signup: (data) => axiosClient.post("/users/signup", data),

  login: (data) => axiosClient.post("/users/login", data),
};

export default authApi;
