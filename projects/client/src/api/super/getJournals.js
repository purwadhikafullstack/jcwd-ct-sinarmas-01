import api from "@/api";

export default async function getJournals (page = 1, sort = "ASC", filter = "") {
  const { data } = await api.get(`/stock/journals?page=${page}&sort=${sort}&filter=${filter}`);
  return data;
}