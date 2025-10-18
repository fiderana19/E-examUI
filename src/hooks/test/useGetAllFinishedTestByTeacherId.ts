import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getFinishedTestByTeacherId } from "@/api/test.api"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAllFinishedTestByTeacherId = (id: number) => {
    const { data, isLoading, isError, error ,refetch } = useQuery({
        queryKey: [QueryCacheKey.TESTS, id],
        queryFn: () => getFinishedTestByTeacherId(id),
        staleTime: Infinity,
        enabled: id !== 0
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la recuperations des tests !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}