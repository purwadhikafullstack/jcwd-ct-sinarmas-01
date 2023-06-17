import axios from "axios";
import getToken from "@/libs/getToken";

export default async function editWarehouse(id, formData) {
	const form = {
		warehouse_name: formData.get("warehouse_name"),
		q: formData.get("geo"),
		address_id: formData.get("address_id")
	}
	const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/warehouses/${id}`, form, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	return data;
}