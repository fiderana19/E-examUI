import { launchTest } from "@/api/test.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLaunchTest = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: number) => launchTest(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Test lancé !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors du lancement du test !",
      });
    },
  });

  return mutation;
};
