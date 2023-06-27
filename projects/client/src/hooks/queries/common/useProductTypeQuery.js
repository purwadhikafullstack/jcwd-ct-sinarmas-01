import { useQuery } from "@tanstack/react-query";
import { getProductType } from "@/api/common";
import usePageStore from "@/hooks/store/usePageStore";

export default function useProductTypeQuery (productId) {
	const page = usePageStore(state => state.page);
	const query = useQuery ({
		queryFn: async () => await getProductType (productId, page),
		queryKey: ["products", productId, "types"]
	});

	return query;
}