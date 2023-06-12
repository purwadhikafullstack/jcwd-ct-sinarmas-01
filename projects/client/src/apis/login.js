import axios from "axios";

export default async function login(form) {
  const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, form);
  return data;
}