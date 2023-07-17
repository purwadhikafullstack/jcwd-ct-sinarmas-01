import api from "@/api";

export default async function orderList (page = 1) {
  const { data } = await api.get(`/orders/all/?page=${page}`);
  return data;
}