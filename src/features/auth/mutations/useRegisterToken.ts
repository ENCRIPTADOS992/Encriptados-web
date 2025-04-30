import { useMutation } from "@tanstack/react-query";

import { MutationOptions } from "@/shared/types/MutationOptions";
import { userRegisterToken } from "../services";
import { RegisterTokenResponse } from "../types/registerToken";

export const useRegisterToken = ({
  onSuccess,
  onError,
}: MutationOptions = {}) => {
  const mutation = useMutation({
    mutationFn: userRegisterToken,
    onSuccess: (data: RegisterTokenResponse) => {
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
    registerToken: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
