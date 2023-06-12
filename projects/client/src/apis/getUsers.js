import axios from "axios";

export default async function getUsers(page) {
  const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
  return data;
}