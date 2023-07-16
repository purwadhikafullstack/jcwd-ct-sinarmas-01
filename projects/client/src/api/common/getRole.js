import api from "@/api";

export default async function getRole() {
	const { data } = await api.get("/auth/role");
	return data;
}