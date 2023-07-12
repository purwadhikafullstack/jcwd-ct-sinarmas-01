import { addToCheckout, removeFromCheckout } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCheckoutMutations () {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["cart"] });
	const add = useMutation({
		mutationFn: async (data) => await addToCheckout(data),
		onSuccess
	})
	const del = useMutation({
		mutationFn: async (data) => await removeFromCheckout(data),
		onSuccess
	});
	return { add, del };
}