import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getResultByGroupId } from "@/api/result.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetResultByGroupId = (id: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.RESULTS, "GROUPES", id],
    queryFn: () => getResultByGroupId(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la recuperations des resultats !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
