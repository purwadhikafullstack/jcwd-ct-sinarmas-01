import axios from "axios";
import getToken from "@/libs/getToken";

export default async function newAdmin(form) {
  const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouses/admins`, form, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return data;
}