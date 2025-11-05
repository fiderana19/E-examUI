import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getTentativeResponseByTestId } from "@/api/tentative.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetTentativeResponseByTestId = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.TENTATIVES, "RESPONSES", id],
    queryFn: () => getTentativeResponseByTestId(id),
    staleTime: Infinity,
    enabled: id !== 0,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message:
          "Erreur lors de la recuperations des responses de la tentative des etudiants !",
      });

      console.log("reto ehh", error);
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
