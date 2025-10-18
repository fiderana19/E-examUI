import { deleteResult } from "@/api/result.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useDeleteResult = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: number) => deleteResult(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Resultat supprimé !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la suppression du resultat !"
            })
        }
    })

    return mutation;
}