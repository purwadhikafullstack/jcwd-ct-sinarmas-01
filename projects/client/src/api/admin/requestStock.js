import api from "@/api";
export default async function requestStock (form) {
  const { data } = await api.post("/stock/request", form);
  return data;
}