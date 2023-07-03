import api from "@/api";

export default async function getCart (user_id) {
	const { data } = await api.get(`/cart/${user_id}`);
	return data;
}