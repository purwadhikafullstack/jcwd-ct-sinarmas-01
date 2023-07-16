import api from "@/api";

export default async function editProduct(form) {
	const { id } = form;
	const { data } = await api.put(`/products/${id}`, form);
	return data;
}