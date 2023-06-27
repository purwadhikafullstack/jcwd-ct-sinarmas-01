import api from "@/api";

export default async function newProduct(form) {
	const { data } = await api.post("/products", form);
	return data;
}