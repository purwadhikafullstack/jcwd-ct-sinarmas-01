import getCheckout from "@/api/user/getCheckout";
import { useQuery } from "@tanstack/react-query";

export default function useCheckouts () {
	const query = useQuery({
		queryFn: async () => await getCheckout(),
		queryKey: ["cart", "checkout"]
	});
	return query;
}