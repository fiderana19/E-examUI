import { patchQuestion } from "@/api/question.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { QuestionEditInterface } from "@/interfaces/question.interface"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePatchQuestion = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: QuestionEditInterface) => patchQuestion(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Question modifiée !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la modification de la question !"
            })
        }
    })

    return mutation;
}