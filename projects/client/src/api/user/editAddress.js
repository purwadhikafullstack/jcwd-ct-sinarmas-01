import api from "@/api";

export default async function editAddress (form) {
	const { id } = form;
	const { data } = await api.put(`/addresses/${id}`, form);
	return data;
}