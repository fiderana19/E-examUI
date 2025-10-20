import { allowedTypes } from "@/constants/FileType";
import * as yup from "yup";

export const PostCreateValidation = yup.object({
  id_utilisateur: yup.string().required("Utilisateur requis !"),
  id_groupe: yup.string().required("Groupe concerné requis !"),
  titre_resultat: yup.string().required("Titre du resultat requis !"),
  fichier_resultat: yup
    .mixed<File>()
    .test("requis", "Le fichier du resultat est requis !", (value: any) => {
      return value instanceof File;
    })
    .test(
      "format",
      "Veuillez selectionner un fichier PDF ou Excel !",
      (value) => {
        if (value instanceof File) {
          return allowedTypes.includes(value.type);
        }
        return true;
      },
    ),
});
