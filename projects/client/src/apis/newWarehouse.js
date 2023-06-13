import axios from "axios";
import getToken from "@/libs/getToken";

export default async function newWarehouse (form) {
	const warehouse_name = form.get("warehouse_name");
	const address_id = form.get("address_id");
	const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouses`, {
		warehouse_name, address_id
	}, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	return data;
}