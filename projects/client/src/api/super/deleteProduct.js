import api from "@/api";

export default async function deleteProduct(id) {
	const { data } = await api.delete(`/products/${id}`);
	return data;
}