import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/common";

export default function useInfProducts() {
  const query = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => await getProducts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return query;
}