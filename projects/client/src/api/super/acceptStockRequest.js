import api from "@/api";

export default async function acceptStockRequest (id) {
  const { data } = await api.put("/stock/request", { id });
  return data;
}