import axios from "axios";

export default async function searchLocation (q) {
	const { data } = await axios.post("/addresses/search", { q });
	return data;
}