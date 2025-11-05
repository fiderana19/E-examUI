import { postQuestion } from "@/api/question.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { QuestionCreateInterface } from "@/interfaces/question.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostQuestion = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: QuestionCreateInterface) => postQuestion(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Question créé !",
      });
    },
    onError: (error: AxiosError) => {
      console.log(error);
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la création de la question !",
      });
    },
  });

  return mutation;
};
