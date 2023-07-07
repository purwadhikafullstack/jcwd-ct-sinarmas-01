import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserAddress, deleteAddress, editAddress } from "@/api/user";

export default function useAddressMutations() {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["addresses"] });
	const useAddMutation = () => useMutation({
		mutationFn: async (data) => await addUserAddress(data),
		onSuccess
	});
	const useDeleteMutation = () => useMutation({
		mutationFn: async (id) => await deleteAddress(id),
		onSuccess
	});
	const useEditMutation = () => useMutation({
		mutationFn: async (data) => await editAddress (data),
		onSuccess
	});

	return {
		useAddMutation, useDeleteMutation, useEditMutation
	}
}