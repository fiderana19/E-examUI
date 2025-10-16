export interface QuestionCreateInterface {
    id_utilisateur: string;
    id_test: string;
    texte_question: string;
    type_question: string;
    points: number;
    response_correcte: string;
}
