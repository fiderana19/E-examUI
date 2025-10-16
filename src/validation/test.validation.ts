import * as yup from 'yup';

export const TestCreateValidation = yup.object({
    id_utilisateur: yup.string().required("Utilisateur requis !"),
    titre: yup.string().required("Titre du test requis !"),
    description_test: yup.string().required("Description du test requis !"),
    dureee_minutes: yup.number().required("Durée du test requis !"),
    max_questions: yup.number().required("Nombre max de questions pour le test requis !"),
    note_max: yup.number().required("Points maximum pour le test requis !"),
    date_declenchement: yup.string().required("Date de declenchement du test requis !"),
})
