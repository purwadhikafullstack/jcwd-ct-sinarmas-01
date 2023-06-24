import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newProduct, editProduct, deleteProduct } from "@/api/super";

export default function useProductMutations() {
	const client = useQueryClient();
	const onSuccess = client.invalidateQueries({ queryKey: ["products"] });

	const useAddMutation = () => useMutation({
		mutationFn: async (data) => await newProduct(data), onSuccess
	});
	const useEditMutation = () => useMutation({
		mutationFn: async (data) => await editProduct(data), onSuccess
	});
	const useDeleteMutation = () => useMutation({
		mutationFn: async (id) => await deleteProduct(id), onSuccess
	})

	return {
		useAddMutation,
		useEditMutation,
		useDeleteMutation
	};
}