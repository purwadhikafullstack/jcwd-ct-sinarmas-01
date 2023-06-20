import api from "@/api";

export default async function setPassword(mode, token, form) {
	const { data } = await api.put(`/auth/account/${mode}/${token}`, form);
	return data;
}