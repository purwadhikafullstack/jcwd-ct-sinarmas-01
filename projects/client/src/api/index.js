import axios from "axios";
import { updateToken, getToken } from "./token";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    const { url } = res.config;
    if (url === "/auth/register") 
      window.location.href = "/login";
    if (url === "/auth/login") {
      updateToken(res.data.token);
      window.location.href = `/${res.data.role}`;
    }
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      err.response.status > 201 && (window.location.href = "/login");
    }

    return Promise.reject(err);
  }
);

export default instance;