import { deleteOption } from "@/api/option.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useDeleteOption = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: number) => deleteOption(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Option supprimé !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la suppression de l'option !"
            })
        }
    })

    return mutation;
}