import api from "@/api";

export default async function editProductType(form) {
	const { product_id, id } = form;
	const { data } = await api.put(`/products/${product_id}/types/${id}`, form);
	return data;
}