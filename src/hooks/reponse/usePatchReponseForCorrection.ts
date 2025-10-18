import { patchReponseForCorrection } from "@/api/reponse.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePatchReponseForCorrection = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => patchReponseForCorrection(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Reponse noté !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la mise à jour de note de la reponse !"
            })
        }
    })

    return mutation;
}