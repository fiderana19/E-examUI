export interface GivePointsInterface {
  id_reponse: string;
  score_question: number;
}

export interface CreateResponseInterface {
  id_test: string;
  id_tentative: string;
  reponses: ResponseInterface[];
}

export interface ResponseInterface {
  id_tentative: string;
  id_question: string;
  reponse_texte: string;
}
