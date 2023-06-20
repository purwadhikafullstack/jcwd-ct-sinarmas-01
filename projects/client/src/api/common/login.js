import api from "@/api";

export default async function login(form) {
  const { data } = await api.post("/auth/login", form);
  return data;
}