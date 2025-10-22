import { getGroupById } from "@/api/group.api";
import { QueryCacheKey } from "@/api/QueryCacheKey";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetGroupById = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.GROUPS, id],
    queryFn: () => getGroupById(id),
    staleTime: Infinity,
    enabled: id !== 0,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la recuperations du groupe !",
      });
    }
    console.log("eto", error)
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
