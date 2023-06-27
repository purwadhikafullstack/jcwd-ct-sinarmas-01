import axios from "axios";

export default async function getAddresses () {
	const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/addresses`);
	return data;
}