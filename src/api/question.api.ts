import { QuestionCreateInterface, QuestionEditInterface } from "@/interfaces/question.interface";
import axiosAuthInstance from "./Config"
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const QuestionAPIUrl = `${import.meta.env.VITE_BASE_URL}/groupe`;

export const getQuestionById = async (id: number) => {
  // return await axiosAuthInstance.get(`${QuestionAPIUrl}/test/${id}`)

  initMockAdapter();
  return await mockedAxios.get(`/question/test/${id}`);
}


export const getQuestionByTestId = async (id: number) => {
  // return await axiosAuthInstance.get(`${QuestionAPIUrl}/test/${id}`)

  initMockAdapter();
  return await mockedAxios.get(`/question/test/${id}`);
}

export const getRandomQuestionByTestId = async (data: any) => {
  // return await axiosAuthInstance.get(`${QuestionAPIUrl}/random/${data?.test}/${data?.max}`)

  initMockAdapter();
  return await mockedAxios.get(`/question/${data}/aleatoire`);
}

export const postQuestion = async (data: QuestionCreateInterface) => {
  // return await axiosAuthInstance.post(`${QuestionAPIUrl}/create`, data)

  initMockAdapter();
  return await mockedAxios.post(`/question/`, data);
}

export const patchQuestion = async (data: QuestionEditInterface) => {
  // return await axiosAuthInstance.patch(`${QuestionAPIUrl}/edit/${data.id_question}`, data)


  initMockAdapter();
  return await mockedAxios.put(`/question/${data.id_question}`, data);
}

export const deleteQuestion = async (id: number) => {
  // return await axiosAuthInstance.delete(`${QuestionAPIUrl}/delete/${id}`)


  initMockAdapter();
  return await mockedAxios.delete(`/question/${id}`);
}