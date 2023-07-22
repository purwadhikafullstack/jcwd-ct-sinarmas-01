import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/common";

export default function useInfProducts(filter = "", sort = "ASC") {
  const query = useInfiniteQuery({
    queryKey: ["products", filter, sort],
    queryFn: async ({ pageParam = 1 }) => await getProducts(pageParam, filter, sort),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  return query;
}