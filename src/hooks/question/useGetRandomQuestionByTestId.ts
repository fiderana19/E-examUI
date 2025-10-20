import { QueryCacheKey } from "@/api/QueryCacheKey";
import { getRandomQuestionByTestId } from "@/api/question.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetRandomQuestionByTestId = (dt: any) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QueryCacheKey.QUESTIONS, dt?.test],
    queryFn: () => getRandomQuestionByTestId(dt),
    staleTime: Infinity,
    enabled: dt?.test !== 0,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la recuperations des questions !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
