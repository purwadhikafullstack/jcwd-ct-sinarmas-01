import axios from "axios";
import { updateToken, getToken, getRole } from "./token";
import Swal from "@/components/Swal";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const { url } = config;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (url.indexOf("/products") > -1) {
      config.headers["Content-Type"] = "multipart/form-data";
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
    const { data } = res;
    if (url.indexOf("/auth/account") > -1) {
      window.location.href = "/login";
    }
    if (url === "/auth/login") {
      const { token } = res.data;
      const role = data.role.substring(0, 5);
      updateToken(token);
      window.location.href = `/${role}`;
    }
    if (url.indexOf("/auth") < 0 && res.config.method.toLowerCase() !== 'get') {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message
      })
    }
    return res;
  },
  async (err) => {
    const method = err.config.method.toLowerCase();
    const { data, status } = err.response;
    (method !== 'get') && Swal.fire({
      title: "Error",
      text: data.message || err.message,
      icon: "error"
    });

    if (status === 401 && method === "get") 
      window.location.href = `/${getRole().toLowerCase() || "login"}`;

    return Promise.reject(err);
  }
);

export default instance;