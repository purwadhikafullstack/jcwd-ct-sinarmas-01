import api from "@/api";

export default async function deleteWarehouse(id) {
	const { data } = await api.delete(`/warehouses/${id}`);
	return data;
}