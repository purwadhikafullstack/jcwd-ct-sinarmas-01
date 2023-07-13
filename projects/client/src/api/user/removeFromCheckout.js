import api from "@/api";

export default async function removeFromCheckout (id) {
	const { data } = await api.delete(`/checkout/${id}`);
	return data;
}