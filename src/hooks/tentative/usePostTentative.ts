import { postTentative } from "@/api/tentative.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePostTentative = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => postTentative(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Bonne chance pour votre test !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la création de tentative !"
            })
        }
    })

    return mutation;
}