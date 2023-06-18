import axios from "axios";
import { updateToken, getToken } from "./token";
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
    const { data } = res;
    if (url === "/auth/register") 
      window.location.href = "/login";
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
    if (err.response.status === 401) {
      window.location.href = "/login";
    }
    Swal.fire({
      title: "Error",
      text: err.response?.data?.message || err.message,
      icon: "error"
    });

    return Promise.reject(err);
  }
);

export default instance;