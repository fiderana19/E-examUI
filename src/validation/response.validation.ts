import * as yup from "yup";

export const GivePointsValidation = yup.object({
  id_reponse: yup.string().required("Reponse requis !"),
  score_question: yup
    .number()
    .required("Note à donner pour la reponse requis !"),
});
