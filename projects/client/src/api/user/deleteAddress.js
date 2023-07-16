import api from "@/api";

export default async function deleteAddresses (address_id) {
	const { data } = await api.delete(`/addresses/${address_id}`);
	return data;
}