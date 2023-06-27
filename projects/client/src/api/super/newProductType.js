import api from "@/api";

export default async function newProductType (id, form) {
	const { data } = await api.post(`/products/${id}/types`, form);
	return data;
}