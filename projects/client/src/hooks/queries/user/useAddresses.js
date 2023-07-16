import { useQuery } from "@tanstack/react-query";
import { getUserAddresses } from "@/api/user";
import usePageStore from "@/hooks/store/usePageStore";

export default function useAddresses () {
	const setLoading = usePageStore(state => state.setLoading);
	const query = useQuery ({
		queryFn: async () => await getUserAddresses(),
		queryKey: ["addresses"],
	});
	if (query.data) setLoading(false);

	return query;
}