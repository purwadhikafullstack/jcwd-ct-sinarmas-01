import api from "@/api";

export default async function getUserAddresses () {
	const { data } = await api.get("/addresses");
	return data;
}