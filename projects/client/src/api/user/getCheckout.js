import api from "@/api";

export default async function getCheckout () {
	const { data } = await api.get("/checkout");
	return data;
}