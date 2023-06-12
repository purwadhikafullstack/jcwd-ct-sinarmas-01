import axios from "axios";
import getToken from "@/libs/getToken";

export default async function deleteWarehouse(id) {
	const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/warehouses/${id}`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	return data;
}