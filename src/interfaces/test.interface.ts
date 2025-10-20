export interface TestCreateInterface {
  id_utilisateur: string;
  titre: string;
  description_test: string;
  dureee_minutes: number;
  max_questions: number;
  note_max: number;
  date_declenchement: string;
}

export interface TestEditInterface {
  id_test: string;
  id_utilisateur: string;
  titre: string;
  description_test: string;
  dureee_minutes: number;
  max_questions: number;
  note_max: number;
  date_declenchement: string;
}
