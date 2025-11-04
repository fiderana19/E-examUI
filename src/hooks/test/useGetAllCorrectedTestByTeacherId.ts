import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getAllCorrectedTest } from "@/api/test.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetAllCorrectedTestByTeacherId = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.TESTS, "ALL_CORRECTED"],
    queryFn: () => getAllCorrectedTest(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la recuperations des tests corrigés !",
      });

      console.log("ito le tsy mety", error)
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
