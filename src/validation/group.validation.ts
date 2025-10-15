import * as yup from 'yup';

export const EditGroupValidation = yup.object({
    id_groupe: yup.string().required("Identifiant requis !"),
    nom: yup.string().required("Nom du groupe requis !"),
    description: yup.string().required("Description du groupe requis !"),
})