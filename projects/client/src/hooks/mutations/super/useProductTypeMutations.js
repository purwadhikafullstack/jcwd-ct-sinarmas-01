import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductType, newProductType, editProductType } from "@/api/super";

export default function useProductTypeMutations () {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["products", "types"] });
	const useAddMutation = () => useMutation({ mutationFn: newProductType, onSuccess });
	const useEditMutation = () => useMutation({ mutationFn: editProductType, onSuccess });
	const useDeleteMutation = () => useMutation({ mutationFn: deleteProductType, onSuccess });

	return {
		useAddMutation, useEditMutation, useDeleteMutation
	};
}