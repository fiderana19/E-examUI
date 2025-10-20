import { postAnnonce } from "@/api/annonce.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { AnnounceAddInterface } from "@/interfaces/announce.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePostAnnonce = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: AnnounceAddInterface) => postAnnonce(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Annonce publiée !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la publication de l'annonce !",
      });
    },
  });

  return mutation;
};
