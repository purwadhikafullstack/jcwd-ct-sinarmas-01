import axios from "axios";

export default async function getWarehouses (page) {
  const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouses?page=${page}`);
  console.log(data);
  return data;
}