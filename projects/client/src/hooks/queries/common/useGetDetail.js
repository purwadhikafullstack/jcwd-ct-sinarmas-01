import { getProductDetail } from "@/api/common";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetail(id) {
  const query = useQuery({
    queryFn: async () => await getProductDetail(id),
    queryKey: ["products", id],
  });

  return query;
}
