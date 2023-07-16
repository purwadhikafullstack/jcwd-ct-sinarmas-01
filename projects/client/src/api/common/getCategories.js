import api from "@/api";

export default async function getCategories(page = 1) {
	const { data } = await api.get(`/categories/?page=${page}`);
	return data;
}