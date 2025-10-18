import { patchTentativeForFinish } from "@/api/tentative.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePatchTentativeForFinish = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => patchTentativeForFinish(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Votre test est bien envoyé !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de l'envoie du test !"
            })
        }
    })

    return mutation;
}