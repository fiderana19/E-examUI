import { postTest, putTestToFinishStatus } from "@/api/test.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { TestCreateInterface } from "@/interfaces/test.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePutTestToFinishStatus = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: string) => putTestToFinishStatus(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Test terminé !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la fermeture du test !",
      });
    },
  });

  return mutation;
};
