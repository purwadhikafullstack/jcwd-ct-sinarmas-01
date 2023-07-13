import { useQuery } from "@tanstack/react-query";
import getProducts from "@/api/common/getProducts";
import usePageStore from "@/hooks/store/usePageStore";
import { useEffect } from "react";

export default function useProductQuery() {
  const page = usePageStore(state => state.page);
  const setLoading = usePageStore(state => state.setLoading);
  const setCount = usePageStore(state => state.setCount);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => await getProducts(page),
    queryKey: ["products", page],
  });
  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
      setCount(data.pages);
    }
  }, [isLoading, setLoading, setCount, data]);

  return {
    data, isLoading, isError, error
  };
}