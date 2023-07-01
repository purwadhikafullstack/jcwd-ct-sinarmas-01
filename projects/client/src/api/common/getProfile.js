import api from "@/api";

export default async function getProfile (username) {
	const { data } = await api.get(`/users/${username}`);
	return data;
}