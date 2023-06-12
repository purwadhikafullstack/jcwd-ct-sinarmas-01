import axios from "axios";

export default async function deleteUser (id) {
  const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/warehouses/admins/${id}`);
  return data;
}