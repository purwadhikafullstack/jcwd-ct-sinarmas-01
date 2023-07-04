import { getCartItem } from "@/api/common";
import { useQuery } from "@tanstack/react-query";

export default function useCartItem(user_id, product_id) {
	const query = useQuery({
		queryFn: async () => await getCartItem(user_id, product_id);
	})
}