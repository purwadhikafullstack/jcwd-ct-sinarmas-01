import api from "@/api";

export default async function addUserAddress (form) {
	const { data } = await api.post("/addresses", form);
	return data;
}