import api from "@/api";

export default async function decreaseCartItem (user_id, product_id) {
	const { data } = await api.put(`/cart/${user_id}/items/${product_id}`, { amount: -1 });
	return data;
}