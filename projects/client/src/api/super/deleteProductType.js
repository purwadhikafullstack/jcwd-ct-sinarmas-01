import api from "@/api";

export default async function deleteProductType (product_id, form) {
	const { id } = form;
	const { data } = await api.delete(`/products/${product_id}/types/${id}`);
	return data;
}