import axios from "axios";
import getToken from "@/libs/getToken";

export default async function editUser (id, form) {
  const email = form.get("email");
  const username = form.get("username");
  const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/warehouses/admins/${id}`, {
    email, username
  }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return data;
}