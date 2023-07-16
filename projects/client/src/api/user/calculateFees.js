import api from "@/api";

export default async function calculateFees (form) {
	const { data } = await api.post("/checkout/calc", form);
	return data;
}