import * as yup from "yup";

export const LoginValidation = yup.object({
  email: yup
    .string()
    .email("Adresse mail invalide !")
    .required("Adresse mail requis !"),
  password: yup.string().required("Mot de passe requis !"),
});

export const SignupValidation = yup.object({
  email: yup
    .string()
    .email("Adresse mail invalide !")
    .required("Adresse mail requis !"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères !")
    .required("Mot de passe requis !"),
  nom: yup.string().required("Le champ nom requis !"),
  matricule: yup.string().required("Matricule requis !"),
  id_groupe: yup.string().required("Veuillez selectionner un groupe !"),
});
