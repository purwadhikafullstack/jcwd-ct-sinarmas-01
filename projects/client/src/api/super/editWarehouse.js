import api from "@/api";

export default async function editWarehouse(form) {
	const { id } = form;
	const { data } = await api.put(`/warehouses/${id}`, form);
	return data;
}