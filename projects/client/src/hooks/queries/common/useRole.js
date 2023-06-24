import { useQuery } from "@tanstack/react-query";
import getRole from "@/api/common/getRole";

export default function useRole() {
	return useQuery({
		queryFn: async () => await getRole(),
		queryKey: ["myrole"]
	});
}