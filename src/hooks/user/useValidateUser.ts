import { patchUserValidation } from "@/api/user.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useValidateUser = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: string) => patchUserValidation(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Utilisateur validé !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la validation de l'utilisateur !"
            })
        }
    })

    return mutation;
}