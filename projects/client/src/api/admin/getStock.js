import api from "@/api";

export default async function getStock (page = 1) {
  const { data } = await api.get(`/stock?page=${page}`);
  return data;
}