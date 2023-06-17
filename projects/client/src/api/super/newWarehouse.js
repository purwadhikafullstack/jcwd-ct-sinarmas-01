import axios from "axios";
import getToken from "@/libs/getToken";

export default async function newWarehouse (form) {
	const warehouse_name = form.get("warehouse_name");
	const q = form.get("geo");
	const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouses`, {
		warehouse_name, q
	}, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	return data;
}