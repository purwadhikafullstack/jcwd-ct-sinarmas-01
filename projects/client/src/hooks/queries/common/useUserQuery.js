import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/common";
import usePageStore from "@/hooks/store/usePageStore";

export default function useUserQuery() {
	const page = usePageStore(state => state.page);
	const setCount = usePageStore(state => state.setCount);
	const goToPage = usePageStore(state => state.goToPage);
	const { data, isError, isLoading } = useQuery({
		queryFn: async () => await getUsers(page),
		queryKey: ["users", page],
		onSuccess: data => {
			setCount(data.pages);
			page > data.pages && goToPage(1);
		}
	});

	return {
		data,
		isError,
		isLoading,
		page
	};
};