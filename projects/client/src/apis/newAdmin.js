import axios from "axios";
import getToken from "@/libs/getToken";

export default async function newAdmin(form) {
  const email = form.get("email");
  const username = form.get("username");
  const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/warehouses/admins`, {
    email, username
  }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return data;
}