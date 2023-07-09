import api from "@/api";

export default async function editCategory (form) {
	const { id } = form;
	const { data } = await api.put(`/categories/${id}`, form);
	return data;
}