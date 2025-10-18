import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getQuestionByTestId } from "@/api/question.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAllQuestionByTestId = (id: number) => {
    const { data, isLoading, isError, error ,refetch } = useQuery({
        queryKey: [QueryCacheKey.QUESTIONS, id],
        queryFn: () => getQuestionByTestId(id),
        staleTime: Infinity,
        enabled: id !== 0
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la recuperations des questions !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}