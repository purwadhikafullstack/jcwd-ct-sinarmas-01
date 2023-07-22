import api from "@/api";

export default async function getStockRequests (page = 1) {
  const { data } = await api.get(`/stock/request?page=${page}`);
  return data;
}