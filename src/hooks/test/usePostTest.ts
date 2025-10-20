import { postTest } from "@/api/test.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { TestCreateInterface } from "@/interfaces/test.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostTest = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: TestCreateInterface) => postTest(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Test créé !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la creation du test !",
      });
    },
  });

  return mutation;
};
