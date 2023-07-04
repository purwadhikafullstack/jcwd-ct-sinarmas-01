import api from "@/api";

export default async function getCartItem (user_id, product_id) {
	const { data } = await api.get(`/cart/${user_id}/items/${product_id}`);
	return data;
}