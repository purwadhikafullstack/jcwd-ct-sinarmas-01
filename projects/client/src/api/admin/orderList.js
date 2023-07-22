import api from "@/api";

export default async function orderList (page = 1, desc = "", filter = "") {
  const { data } = await api.get(`/orders/all/?page=${page}&desc=${desc}&filter=${filter}`);
  return data;
}