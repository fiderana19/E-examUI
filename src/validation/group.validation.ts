import * as yup from "yup";

export const AddGroupValidation = yup.object({
  nom_groupe: yup.string().required("Nom du groupe requis !"),
  description: yup.string().required("Description du groupe requis !"),
});

export const EditGroupValidation = yup.object({
  id_groupe: yup.string().required("Identifiant requis !"),
  nom_groupe: yup.string().required("Nom du groupe requis !"),
  description: yup.string().required("Description du groupe requis !"),
});
