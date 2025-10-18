import { patchAnnonce } from "@/api/annonce.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { AnnounceEditInterface } from "@/interfaces/announce.interface"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePatchAnnonce = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: AnnounceEditInterface) => patchAnnonce(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Annonce modifiée !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la modification de l'annonce !"
            })
        }
    })

    return mutation;
}