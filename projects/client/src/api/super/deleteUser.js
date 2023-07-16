import api from "@/api";

export default async function deleteUser (id) {
  const { data } = await api.delete(`/warehouses/admins/${id}`);
  return data;
}