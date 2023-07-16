import api from "@/api";

export default async function newWarehouse (form) {
	const { data } = await api.post("/warehouses", form);
	return data;
}