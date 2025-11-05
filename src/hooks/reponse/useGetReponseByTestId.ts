import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getReponseByTestId } from "@/api/reponse.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetReponseByTestId = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      QueryCacheKey.REPONSES,
      QueryCacheKey.TENTATIVES,
      "CORRECTION",
      id,
    ],
    queryFn: () => getReponseByTestId(id),
    staleTime: Infinity,
    enabled: id !== 0,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la recuperations des reponses !",
      });
      console.log("erreur test", error);
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
