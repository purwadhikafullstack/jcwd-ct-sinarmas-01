import api from "@/api";

export default async function getWarehouses (page = 1) {
  const { data } = await api.get(`/warehouses?page=${page}`);
  return data;
}