import api from "@/api";

export default async function register(form) {
  const { data } = await api.post("/auth/register", form);
  return data;
}