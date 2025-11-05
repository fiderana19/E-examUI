import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getAllResult } from "@/api/result.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetAllResult = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.RESULTS],
    queryFn: () => getAllResult(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la recuperations des resultats !",
      });

      console.log("result error", error);
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
