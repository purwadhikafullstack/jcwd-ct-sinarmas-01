import api from "@/api";

export default async function newAdmin(form) {
  const { data } = await api.post("/warehouses/admins", form);
  return data;
}