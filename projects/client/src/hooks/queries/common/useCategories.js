import { getCategories } from "@/api/common";
import usePageStore from "@/hooks/store/usePageStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useCategories () {
	const page = usePageStore(state => state.page);
	const setLoading = usePageStore(state => state.setLoading);
	const setCount = usePageStore(state => state.setCount);
	const { data, isLoading, isError, error } = useQuery({
		queryFn: async () => await getCategories(page),
		queryKey: ["categories", page],
	});

	useEffect(() => {
		if(!isLoading && data) {
			setLoading(false);
			setCount(data.pages);
		}
	}, [data, isLoading, setCount, setLoading]);

	return {
		data,
		isLoading,
		isError,
		error
	}
}