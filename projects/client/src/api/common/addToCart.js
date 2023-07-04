import api from "@/api";

export default async function addToCart (user_id, product_id) {
	const { data } = await api.post(`/cart/${user_id}/items`, { product_id });
	return data;
}