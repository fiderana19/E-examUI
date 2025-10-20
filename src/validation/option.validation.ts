import * as yup from "yup";

export const OptionAddValidation = yup.object({
  id_question: yup.string().required("Question de l'option requis !"),
  texte_option: yup.string().required("Texte de l'option requis !"),
  est_correcte: yup.boolean().required("La decision de l'option !"),
});
