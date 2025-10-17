import * as yup from 'yup';

export const PostCreateValidation = yup.object({
    id_utilisateur: yup.string().required("Utilisateur requis !"),
    id_groupe: yup.string().required("Groupe concerné requis !"),
    titre_resultat: yup.string().required("Titre du resultat requis !"),
    fichier_resultat: yup.string().required("Fichier requis !"),
})