import { postInscription } from "@/api/user.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { SignupInterface } from "@/interfaces/user.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSignup = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: SignupInterface) => postInscription(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Inscription réussie !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de l'inscription !",
      });
    },
  });

  return mutation;
};
