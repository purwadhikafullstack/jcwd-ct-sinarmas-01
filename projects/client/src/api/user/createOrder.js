import api from "@/api";

export default async function createOrder(form) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
  const { data } = await api.post("/orders", form, config);
  return data;
}