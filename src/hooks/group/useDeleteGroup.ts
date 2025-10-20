import { deleteGroup } from "@/api/group.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteGroup = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: number) => deleteGroup(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Groupe supprimé !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la suppression du groupe !",
      });
    },
  });

  return mutation;
};
