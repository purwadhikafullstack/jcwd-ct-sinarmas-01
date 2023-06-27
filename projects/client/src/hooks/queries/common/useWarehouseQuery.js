import { useQuery } from "@tanstack/react-query";
import { getWarehouses } from "@/api/common";
import usePageStore from "@/hooks/store/usePageStore";

export default function useWarehouseQuery () {
	const page = usePageStore(state => state.page);
	const setCount = usePageStore(state => state.setCount);
	const goToPage = usePageStore(state => state.goToPage);
	const setLoading = usePageStore(state => state.setLoading);
	const { data, isError, isLoading } = useQuery({
		queryFn: async () => await getWarehouses(page),
		queryKey: ["warehouses", page],
		onSuccess: (data) => {
			setCount(data.pages);
			setLoading(false);
			page > data.pages && goToPage(1);
		}
	});
	const nextPage = usePageStore(state => state.nextPage);
	const prevPage = usePageStore(state => state.prevPage);
	const pagesCount = usePageStore(state => state.count);

	return {
		nextPage,
		prevPage,
		goToPage,
		data,
		isError,
		isLoading,
		pagesCount,
		setCount
	}
}