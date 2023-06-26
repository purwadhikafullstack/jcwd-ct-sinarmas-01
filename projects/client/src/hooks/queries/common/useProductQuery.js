import { useQuery } from "@tanstack/react-query";
import getProducts from "@/api/common/getProducts";
import usePageStore from "@/hooks/store/usePageStore";

export default function useProductQuery() {
  const page = usePageStore(state => state.page);
  const setLoading = usePageStore(state => state.setLoading);
  const query = useQuery({
    queryFn: async () => await getProducts(page),
    queryKey: ["products", page],
    onSuccess: () => setLoading(false)
  });
  const { data } = query;

  return {
    data
  };
}