import createOrder from "@/api/user/createOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateOrder () {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => await createOrder(data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["cart", "checkout"] })
  });
  return mutation;
}