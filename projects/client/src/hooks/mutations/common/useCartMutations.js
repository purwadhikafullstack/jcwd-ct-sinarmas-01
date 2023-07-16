import { addToCart, decreaseCartItem, deleteCartItem } from "@/api/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCartMutations() {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["cart"] });
	const useAddMutation = () => useMutation({
		mutationFn: async ({ user_id, product_id }) => await addToCart(user_id, product_id),
		onSuccess
	});
	const useDecrease = () => useMutation({
		mutationFn: async ({ user_id, product_id }) => await decreaseCartItem(user_id, product_id),
		onSuccess
	});
	const useDeleteItem = () => useMutation({
		mutationFn: async ({ user_id, product_id }) => await deleteCartItem(user_id, product_id),
		onSuccess
	})

	return {
		useAddMutation, 
		useDecrease,
		useDeleteItem
	}
}