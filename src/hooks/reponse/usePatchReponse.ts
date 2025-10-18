import { patchReponse } from "@/api/reponse.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePatchReponse = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => patchReponse(data),
        onSuccess: () => {
            if(action) {
                action();
            }
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la mise à jour de la reponse !"
            })
        }
    })

    return mutation;
}