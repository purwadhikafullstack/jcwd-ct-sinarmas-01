import api from "@/api";

export default async function getProducts(page = 1, filter = "", sort = "ASC") {
	const { data } = await api.get(`/products?page=${page}&filter=${filter}&sort=${sort}`);
	return data;
}