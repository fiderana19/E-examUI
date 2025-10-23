export interface QuestionCreateInterface {
  id_utilisateur: string;
  id_test: string;
  texte_question: string;
  type_question: string;
  response_correcte: string;
}

export interface QuestionEditInterface {
  id_question: string;
  id_utilisateur: string;
  id_test: string;
  texte_question: string;
  type_question: string;
  response_correcte: string;
}
