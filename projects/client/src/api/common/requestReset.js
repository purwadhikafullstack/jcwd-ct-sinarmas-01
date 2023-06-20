import api from "@/api";

export default async function requestReset(form) {
	const { data } = await api.post("/auth/reset", form);
	return data;
}