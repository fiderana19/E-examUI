import { postResult } from "@/api/result.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { PostCreateInterface } from "@/interfaces/post.interface"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePostResult = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: PostCreateInterface) => postResult(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Resultat publié !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la publication du resultat !"
            })
        }
    })

    return mutation;
}