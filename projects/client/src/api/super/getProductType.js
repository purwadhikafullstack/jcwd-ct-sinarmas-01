import api from "@/api";

export default async function getProductType (product_id, page = 1) {
	const { data } = await api.get(`/products/${product_id}/types?page=${page}`);
	return data;
}