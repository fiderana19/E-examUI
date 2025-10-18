import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getNotCorrectedReponse } from "@/api/reponse.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetNotCorrectedReponse = () => {
    const { data, isLoading, isError, error ,refetch } = useQuery({
        queryKey: [QueryCacheKey.REPONSES],
        queryFn: () => getNotCorrectedReponse(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la recuperations des reponses !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}