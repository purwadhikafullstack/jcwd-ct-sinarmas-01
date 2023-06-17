import axios from "axios";

export default async function register(form) {
  const { data } = await axios.post("/auth/register", form);
  return data;
}