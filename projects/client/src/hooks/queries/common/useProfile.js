import { useQuery } from "@tanstack/react-query";
import getProfile from "@/api/common/getProfile";

export default function useProfile(email) {
	const { data, isLoading, isError } = useQuery({
		queryFn: async () => await getProfile(email),
		queryKey: ["users", email],
	});

	return {
		data,
		isLoading,
		isError,
	};
}
