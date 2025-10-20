import { postReponse } from "@/api/reponse.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostReponse = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: any) => postReponse(data),
    onSuccess: () => {
      if (action) {
        action();
      }
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la création de la reponse !",
      });
    },
  });

  return mutation;
};
