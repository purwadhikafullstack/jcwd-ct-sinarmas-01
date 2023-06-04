import axios from "axios";

export default async function getWarehouses () {
  const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouses`);

  return data;
}