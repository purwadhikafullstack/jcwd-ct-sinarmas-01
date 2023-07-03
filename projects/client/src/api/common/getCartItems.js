import api from "@/api";

export default async function getCartItems(user_id) {
	const { data } = await api.get(`/cart/${user_id}/items`);
	return data;
}