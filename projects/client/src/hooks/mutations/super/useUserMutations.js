import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, editUser, newAdmin } from "@/api/super";

export default function useUserMutations() {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["users"] });
	const useAddMutation = () => useMutation({
		mutationFn: async (data) => await newAdmin(data),
		onSuccess
	});
	const useEditMutation = () => useMutation({
		mutationFn: async (data) => await editUser(data),
		onSuccess
	});
	const useDeleteMutation = () => useMutation({
		mutationFn: async (data) => await deleteUser(data),
		onSuccess
	});

	return {
		useAddMutation, useEditMutation, useDeleteMutation
	};
}