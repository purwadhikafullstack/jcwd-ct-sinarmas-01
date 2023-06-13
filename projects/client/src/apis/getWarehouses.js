import axios from "axios";
import getToken from "@/libs/getToken";

export default async function getWarehouses (page = 1) {
  const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouses?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return data;
}