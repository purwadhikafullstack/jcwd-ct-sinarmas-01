import { getStock } from "@/api/admin";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useStock () {
  const { data, isFetching, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => await getStock(pageParam),
    queryKey: ["stocks"],
    getNextPageParam: (data) => ((data.page < data.pages) ? data.page + 1 : undefined)
  });
  return { data, isFetching, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage };
}