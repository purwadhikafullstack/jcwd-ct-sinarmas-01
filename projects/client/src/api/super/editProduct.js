import api from "@/api";

export default async function editProduct(form) {
	const id = form.get("id");
	const { data } = await api.put(`/products/${id}`, form);
	return data;
}