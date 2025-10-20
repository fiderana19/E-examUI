import * as yup from "yup";

export const EditAnnounceValidation = yup.object({
  id_annonce: yup.string().required("Identifiant requis !"),
  id_createur: yup.string().required("Createur requis !"),
  titre_annonce: yup.string().required("Titre d'annonce requis !"),
  texte_annonce: yup.string().required("Texte d'annonce requis !"),
  date_creation: yup.string().required("Date de creation requis !"),
  id_groupe: yup.string().required("Groupe pour l'annonce requis !"),
});

export const AddAnnounceValidation = yup.object({
  id_createur: yup.string().required("Createur requis !"),
  titre_annonce: yup.string().required("Titre d'annonce requis !"),
  texte_annonce: yup.string().required("Texte d'annonce requis !"),
  date_creation: yup.string().required("Date de creation requis !"),
  id_groupe: yup.string().required("Groupe pour l'annonce requis !"),
});
