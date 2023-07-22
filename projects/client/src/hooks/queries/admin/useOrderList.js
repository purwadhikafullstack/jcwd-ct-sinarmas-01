import orderList from "@/api/admin/orderList";
import usePageStore from "@/hooks/store/usePageStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useOrderList (desc = "", filter = "") {
  const setLoading = usePageStore(state => state.setLoading);

  const { data, isError, isFetching, isFetchingNextPage, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => await orderList(pageParam, desc, filter),
    queryKey: ["orders", desc, filter],
    getNextPageParam: (data) => (data.page < data.pages && data.rows?.length > 0) ? data.page + 1 : undefined
  });
  
  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

  return { data, isError, error, isFetchingNextPage, isFetching, hasNextPage, fetchNextPage };
}