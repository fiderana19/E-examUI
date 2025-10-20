import { postOption } from "@/api/option.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { OptionCreateInterface } from "@/interfaces/option.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostOption = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: OptionCreateInterface) => postOption(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Option créé !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la création de l'option !",
      });
    },
  });

  return mutation;
};
