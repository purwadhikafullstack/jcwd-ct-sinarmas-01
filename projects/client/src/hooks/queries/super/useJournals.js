import getJournals from "@/api/super/getJournals";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useJournals (sort = "ASC", filter = "") {
  const query = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => await getJournals(pageParam, sort, filter),
    queryKey: ["stocks", "journals", sort, filter],
    getNextPageParam: ({ page, pages }) => page < pages ? page + 1 : undefined
  });
  return query;
}