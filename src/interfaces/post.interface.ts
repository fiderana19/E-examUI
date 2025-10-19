export interface PostCreateInterface {
    id_utilisateur: string;
    id_groupe: string;
    titre_resultat: string;
    fichier_resultat: File | null;
}
