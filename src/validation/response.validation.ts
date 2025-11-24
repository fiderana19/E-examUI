import * as yup from "yup";

export const GivePointsValidation = yup.object({
  id_reponse: yup.string().required("Reponse requis !"),
  score_question: yup
    .number()
    .max(2, "Note maximale limité à 2 !")
    .required("Note à donner pour la reponse requis !"),
});
