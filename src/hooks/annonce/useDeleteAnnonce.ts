import { deleteAnnonce } from "@/api/annonce.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteAnnonce = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: number) => deleteAnnonce(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Annonce supprimée !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la suppression de l'annonce !",
      });
    },
  });

  return mutation;
};
