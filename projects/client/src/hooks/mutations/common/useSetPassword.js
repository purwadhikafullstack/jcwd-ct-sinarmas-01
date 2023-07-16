import { useMutation } from "@tanstack/react-query";
import { setPassword } from "@/api/common";
import { useParams } from "react-router-dom";

export default function useSetPassword() {
	const { mode, token } = useParams();
	return useMutation({
		mutationFn: async (data) => await setPassword(mode, token, data)
	});
}