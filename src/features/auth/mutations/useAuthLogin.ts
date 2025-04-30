import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/shared/types/MutationOptions";
import { userAuthLogin } from "../services";

export const useAuthLogin = ({ onSuccess, onError }: MutationOptions = {}) => {
  const mutation = useMutation({
    mutationFn: userAuthLogin,

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
    login: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
