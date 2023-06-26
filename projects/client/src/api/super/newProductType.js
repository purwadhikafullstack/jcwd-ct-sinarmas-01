import api from "@/api";

export default async function newProductType (form) {
	const { id } = form;
	const { data } = await api.post(`/products/${id}/types`, form);
	return data;
}