import axios from "axios";

export default async function searchLocation (q) {
	const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/addresses/search`, { q });
	return data;
}