import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getTentativeForResultByTestId } from "@/api/tentative.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetTentativeForResultByTestId = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.TENTATIVES, "RESULTATS", id],
    queryFn: () => getTentativeForResultByTestId(id),
    staleTime: Infinity,
    enabled: id !== 0,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message:
          "Erreur lors de la recuperations des tentatives des etudiants !",
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
