import Cookies from "js-cookie";

export default function useLogin() {
  return {
    setToken: (token) => Cookies.set("login", token),
    getToken: () => Cookies.get("login")
  };
}
