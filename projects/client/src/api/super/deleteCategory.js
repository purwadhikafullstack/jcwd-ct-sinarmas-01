import api from "@/api";

export default async function deleteCategory (id) {
	const { data } = await api.delete(`/categories/${id}`);
	return data;
}