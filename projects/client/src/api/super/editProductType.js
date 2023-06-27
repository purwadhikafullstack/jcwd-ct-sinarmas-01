import api from "@/api";

export default async function editProductType(product_id, form) {
	const { id } = form;
	const { data } = await api.put(`/products/${product_id}/types/${id}`, form);
	return data;
}