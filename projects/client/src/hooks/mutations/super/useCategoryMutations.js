import { deleteCategory, editCategory, newCategory } from "@/api/super";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCategoryMutations () {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["categories"] });
	const useAddMutation = () => useMutation({
		mutationFn: async (data) => await newCategory(data),
		onSuccess
	});
	const useEditMutation = () => useMutation({
		mutationFn: async (data) => await editCategory(data),
		onSuccess
	});
	const useDeleteMutation = () => useMutation({
		mutationFn: async (data) => await deleteCategory(data),
		onSuccess
	});
	return {
		useAddMutation, useEditMutation, useDeleteMutation
	};
}