import * as yup from "yup";

export const TestCreateValidation = yup.object({
  id_utilisateur: yup.string().required("Utilisateur requis !"),
  id_groupe: yup.string().required("Groupe requis !"),
  titre: yup.string().required("Titre du test requis !"),
  description: yup.string().required("Description du test requis !"),
  duree_minutes: yup.number().required("Durée du test requis !"),
});

export const TestEditValidation = yup.object({
  id_test: yup.string().required("Identifiant requis !"),
  id_utilisateur: yup.string().required("Utilisateur requis !"),
  id_groupe: yup.string().required("Groupe requis !"),
  titre: yup.string().required("Titre du test requis !"),
  description: yup.string().required("Description du test requis !"),
  duree_minutes: yup.number().required("Durée du test requis !"),
});
