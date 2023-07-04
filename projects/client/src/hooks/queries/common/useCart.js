import { getCartItems } from "@/api/common";
import { useQuery } from "@tanstack/react-query";

export default function useCart(user_id) {
	const { data, isLoading, isError } = useQuery({
		queryFn: async () => await getCartItems(user_id),
		queryKey: ["cart"],
	});

	return { data, isLoading, isError };
}
