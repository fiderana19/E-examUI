import { postGroup } from "@/api/group.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { AddGroupInterface } from "@/interfaces/groupe.interface"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePostGroup = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: AddGroupInterface) => postGroup(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Groupe créé !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la création du groupe !"
            })
        }
    })

    return mutation;
}