import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductType, newProductType, editProductType } from "@/api/super";

export default function useProductTypeMutations () {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["products", "types"] });
	const useAddMutation = (productId) => useMutation({ 
		mutationFn: async (data) => await newProductType(productId, data), 
		onSuccess 
	});
	const useEditMutation = (productId) => useMutation({ 
		mutationFn: async (data) => await editProductType(productId, data), 
		onSuccess 
	});
	const useDeleteMutation = (productId) => useMutation({ 
		mutationFn: async (data) => await deleteProductType(productId, data), 
		onSuccess 
	});

	return {
		useAddMutation, useEditMutation, useDeleteMutation
	};
}