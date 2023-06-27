import api from "@/api";

export default async function getUsers(page = 1) {
  const { data } = await api.get(`/users?page=${page}`);
  return data;
}