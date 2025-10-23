import * as yup from "yup";

export const QuestionCreateValidation = yup.object({
  id_utilisateur: yup.string().required("Utilisateur requis !"),
  id_test: yup.string().required("Test de la question requis !"),
  texte_question: yup.string().required("Le texte de la question requise !"),
  type_question: yup.string().required("Type de la question requis !"),
  response_correcte: yup.string().required("La reponse correcte est requise !"),
});

export const QuestionEditValidation = yup.object({
  id_question: yup.string().required("Question requise !"),
  id_utilisateur: yup.string().required("Utilisateur requis !"),
  id_test: yup.string().required("Test de la question requis !"),
  texte_question: yup.string().required("Le texte de la question requise !"),
  type_question: yup.string().required("Type de la question requis !"),
  response_correcte: yup.string().required("La reponse correcte est requise !"),
});
