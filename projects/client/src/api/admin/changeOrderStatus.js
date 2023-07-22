import api from "@/api";

export default async function changeOrderStatus (id, form) {
  const { data } = await api.put(`/orders/${id}`, form);
  return data;
}