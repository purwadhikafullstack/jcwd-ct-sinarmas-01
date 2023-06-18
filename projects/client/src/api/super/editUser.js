import api from "@/api";

export default async function editUser (id, form) {
  const { data } = await api.put(`/warehouses/admins/${id}`, form);
  return data;
}