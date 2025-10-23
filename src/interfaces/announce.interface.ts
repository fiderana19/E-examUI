export interface AnnounceEditInterface {
  id_annonce: string;
  id_utilisateur: string;
  titre_annonce: string;
  texte_annonce: string;
  id_groupe: string;
}

export interface AnnounceAddInterface {
  id_utilisateur: string;
  titre_annonce: string;
  texte_annonce: string;
  id_groupe: string;
}
