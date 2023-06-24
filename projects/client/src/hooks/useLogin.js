import Cookies from "js-cookie";

export default function useLogin() {
  return {
    setToken: (token) => Cookies.set("login", token, { expires: 6 }),
    getToken: () => Cookies.get("login")
  };
}
