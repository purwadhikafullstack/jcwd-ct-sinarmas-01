import axios from "axios";

export default async function register(form) {
  const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, form);
  return data;
}