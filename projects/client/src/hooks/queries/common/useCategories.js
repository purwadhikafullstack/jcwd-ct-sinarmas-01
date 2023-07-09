import { getCategories } from "@/api/common";
import usePageStore from "@/hooks/store/usePageStore";
import { useQuery } from "@tanstack/react-query";

export default function useCategories () {
	const page = usePageStore(state => state.page);
	const setLoading = usePageStore(state => state.setLoading);
	const { data, isLoading, isError, error } = useQuery({
		queryFn: async () => await getCategories(page),
		queryKey: ["categories"],
	});

	if(!isLoading) setLoading(false);

	return {
		data,
		isLoading,
		isError,
		error
	}
}