import calculateFees from "@/api/user/calculateFees";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCalcFees () {
	const client = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (data) => await calculateFees(data),
		onSuccess: () => client.invalidateQueries({ queryKey: ["cart", "checkout"] })
	});
	return mutation;
}