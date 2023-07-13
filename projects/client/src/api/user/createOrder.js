import api from "@/api";

export default async function createOrder(form) {
  const { data } = await api.post("/orders", form);
  return data;
}