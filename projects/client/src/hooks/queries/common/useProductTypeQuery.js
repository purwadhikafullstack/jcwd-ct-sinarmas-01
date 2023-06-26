import { useQuery } from "@tanstack/react-query";
import { getProductType } from "@/api/common";
import { useState } from "react";
import usePageStore from "@/hooks/store/usePageStore";

export default function useProductTypeQuery () {
	const [productId, setProductId] = useState(1);
	const page = usePageStore(state => state.page);
	const { data } = useQuery ({
		queryFn: async () => await getProductType (productId, page),
		queryKey:
	})
}