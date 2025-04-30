import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/shared/types/MutationOptions";
import { rechargeNumberSim } from "../services";

export const useRechargeNumber = ({
  onSuccess,
  onError,
}: MutationOptions = {}) => {
  const mutation = useMutation({
    mutationFn: rechargeNumberSim,

    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      console.error(error);

      if (onError) {
        onError(error);
      }
    },
  });

  return {
    recharge: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
