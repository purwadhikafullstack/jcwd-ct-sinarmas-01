import api from "@/api";

export default async function getProductDetail (id) {
	const { data } = await api.get(`/products/${id}`);
	return data;
}