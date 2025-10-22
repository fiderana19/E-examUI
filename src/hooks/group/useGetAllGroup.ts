import { getAllGroup } from "@/api/group.api";
import { QueryCacheKey } from "@/api/QueryCacheKey";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetAllGroup = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.GROUPS],
    queryFn: () => getAllGroup(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la recuperations des groupes !",
      });
      console.log("ito ", error)
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
