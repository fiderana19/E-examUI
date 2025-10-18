import { QuestionCreateInterface, QuestionEditInterface } from "@/interfaces/question.interface";
import axiosAuthInstance from "./Config"

const QuestionAPIUrl = `${import.meta.env.VITE_BASE_URL}/groupe`;

export const getQuestionByTestId = async (id: number) => {
  return await axiosAuthInstance.get(`${QuestionAPIUrl}/test/${id}`)
}

export const getRandomQuestionByTestId = async (data: any) => {
  return await axiosAuthInstance.get(`${QuestionAPIUrl}/random/${data?.test}/${data?.max}`)
}

export const postQuestion = async (data: QuestionCreateInterface) => {
  return await axiosAuthInstance.post(`${QuestionAPIUrl}/create`, data)
}

export const patchQuestion = async (data: QuestionEditInterface) => {
  return await axiosAuthInstance.patch(`${QuestionAPIUrl}/edit/${data.id_question}`, data)
}

export const deleteQuestion = async (id: number) => {
  return await axiosAuthInstance.delete(`${QuestionAPIUrl}/delete/${id}`)
}