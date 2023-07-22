import getStockRequests from "@/api/common/getStockRequests";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useStockRequests () {
  const query = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => await getStockRequests(pageParam),
    queryKey: ["stock", "requests"],
    getNextPageParam: ({ page, pages }) => (page < pages ? page + 1 : undefined)
  });

  return query;
}