import api from "@/api";

export default async function deleteCartItem (user_id, product_id) {
	const { data } = await api.delete(`/cart/${user_id}/items/${product_id}`);
	return data;
}