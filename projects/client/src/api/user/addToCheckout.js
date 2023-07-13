import api from "@/api";

export default async function addToCheckout (form) {
	const { data } = await api.post("/checkout", form);
	return data;
}