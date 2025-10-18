export interface AnnounceEditInterface {
    id_annonce: string;
    id_createur: string;
    titre_annonce: string;
    texte_annonce: string;
    date_creation: string;
    id_groupe: string;
}

export interface AnnounceAddInterface {
    id_createur: string;
    titre_annonce: string;
    texte_annonce: string;
    date_creation: string;
    id_groupe: string;
}