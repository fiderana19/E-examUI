import { deleteTest } from "@/api/test.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useDeleteTest = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: number) => deleteTest(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Test supprimé !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la suppression du test !"
            })
        }
    })

    return mutation;
}