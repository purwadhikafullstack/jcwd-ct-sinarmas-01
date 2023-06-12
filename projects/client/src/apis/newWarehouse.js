import axios from "axios";
import getToken from "@/libs/getToken";

export default async function newWarehouse (form) {
	const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouses`, form, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	return data;
}