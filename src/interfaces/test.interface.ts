export interface TestCreateInterface {
  id_utilisateur: string;
  id_groupe: string;
  titre: string;
  description: string;
  duree_minutes: number;
}

export interface TestEditInterface {
  id_test: string;
  id_groupe: string;
  id_utilisateur: string;
  titre: string;
  description: string;
  duree_minutes: number;
}
