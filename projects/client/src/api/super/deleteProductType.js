import api from "@/api";

export default async function deleteProductType (form) {
	const { product_id, id } = form;
	const { data } = await api.delete(`/products/${product_id}/types/${id}`);
	return data;
}