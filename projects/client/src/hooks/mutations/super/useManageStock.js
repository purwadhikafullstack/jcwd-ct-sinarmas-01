import addStock from "@/api/super/addStock";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useManageStock() {
  const client = useQueryClient();
  const add = useMutation({
    mutationFn: async (data) => await addStock(data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["stocks"] })
  });
  return add;
}