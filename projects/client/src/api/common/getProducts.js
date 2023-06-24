import api from "@/api";

export default async function getProducts(page = 1) {
	const { data } = await api.get(`/products?page=${page}`);
	return data;
}