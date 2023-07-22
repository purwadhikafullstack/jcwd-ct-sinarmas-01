import api from "@/api";

export default async function addStock (form) {
  const { data } = await api.post("/stock", form);
  return data;
}