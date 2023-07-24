import { changeOrderStatus } from "@/api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useOrderMutations () {
  const client = useQueryClient();
  const onSuccess = () => client.invalidateQueries({ queryKey: ["orders"] });
  const changeStatus = useMutation({
    mutationFn: async ({ id, status }) => await changeOrderStatus(id, { status }),
    onSuccess
  });

  return { changeStatus };
}