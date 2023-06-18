import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWarehouse, editWarehouse, newWarehouse } from "@/api/super";


export default function useWarehouseMutations () {
	const client = useQueryClient();
	const onSuccess = () => client.invalidateQueries({ queryKey: ["warehouses"] });
	const useAddMutation = () => useMutation({ mutationFn: async (data) => newWarehouse(data), onSuccess });
	const useEditMutation = () => useMutation({ mutationFn: async (editId, data) => editWarehouse(editId, data), onSuccess });
	const useDeleteMutation = () => useMutation({ mutationFn: async (id) => deleteWarehouse(id), onSuccess });

	return {
		useAddMutation, useEditMutation, useDeleteMutation
	};
};