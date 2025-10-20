import { deleteQuestion } from "@/api/question.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteQuestion = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: number) => deleteQuestion(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Question supprimée !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la suppression de la question !",
      });
    },
  });

  return mutation;
};
