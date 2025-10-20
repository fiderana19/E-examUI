import { patchGroup } from "@/api/group.api";
import { TOAST_TYPE } from "@/constants/ToastType";
import { EditGroupInterface } from "@/interfaces/groupe.interface";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const usePatchGroup = ({ action }: { action: () => void }) => {
  const mutation = useMutation({
    mutationFn: (data: EditGroupInterface) => patchGroup(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Groupe modifié !",
      });
    },
    onError: (error: AxiosError) => {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la modification du groupe !",
      });
    },
  });

  return mutation;
};
