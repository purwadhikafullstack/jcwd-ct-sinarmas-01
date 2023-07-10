import { useQuery } from "@tanstack/react-query";
import getProducts from "@/api/common/getProducts";
import usePageStore from "@/hooks/store/usePageStore";
import { useEffect } from "react";

export default function useProductQuery() {
  const page = usePageStore(state => state.page);
  const setLoading = usePageStore(state => state.setLoading);
  const setCount = usePageStore(state => state.setCount);
  useEffect(() => {
    setLoading(true);
  }, [page, setLoading]);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => await getProducts(page),
    queryKey: ["products", page],
  });
  if (!isLoading) {
    setLoading (false);
    setCount(data.pages);
  }

  return {
    data, isLoading, isError, error
  };
}