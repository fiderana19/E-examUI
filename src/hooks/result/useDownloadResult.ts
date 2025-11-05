import { QueryCacheKey } from "@/api/QueryCacheKey";
import { dowloadResult, getResultByGroupId } from "@/api/result.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useDownloadResult = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.RESULTS, "DOWNLOAD", id],
    queryFn: () => dowloadResult(id),
    staleTime: Infinity,
    enabled: id !== 0,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors du telechargement du resultat !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
