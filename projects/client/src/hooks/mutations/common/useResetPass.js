import { useMutation } from "@tanstack/react-query";
import { requestReset } from "@/api/common";

export default function useResetPass() {
	const mutation = useMutation({
		mutationFn: async (data) => await requestReset(data)
	});
	return mutation;
}