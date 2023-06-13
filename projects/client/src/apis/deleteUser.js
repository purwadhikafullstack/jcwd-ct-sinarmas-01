import axios from "axios";
import getToken from "@/libs/getToken";

export default async function deleteUser (id) {
  const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/warehouses/admins/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return data;
}