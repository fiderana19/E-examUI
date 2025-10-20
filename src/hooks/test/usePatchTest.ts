import { patchTest } from "@/api/test.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { TestEditInterface } from "@/interfaces/test.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePatchTest = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: TestEditInterface) => patchTest(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Test modifié !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la modification du test !",
      });
    },
  });

  return mutation;
};
