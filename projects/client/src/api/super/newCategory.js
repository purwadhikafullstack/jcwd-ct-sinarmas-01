import api from "@/api";

export default async function newCategory (form) {
	const { data } = await api.post("/categories", form);
	return data;
}