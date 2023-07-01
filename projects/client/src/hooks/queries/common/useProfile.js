import { useQuery } from "@tanstack/react-query";
import getProfile from "@/api/common/getProfile";

export default function useProfile(username) {
	const { data, isLoading, isError } = useQuery({
		queryFn: async () => await getProfile(username),
		queryKey: ["users", username],
	});

	return {
		data,
		isLoading,
		isError,
	};
}
