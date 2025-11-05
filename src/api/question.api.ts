import {
  QuestionCreateInterface,
  QuestionEditInterface,
} from "@/interfaces/question.interface";
import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const QuestionAPIUrl = `${import.meta.env.VITE_BASE_URL}/questions`;

export const getQuestionById = async (id: number) => {
  return await axiosAuthInstance.get(`${QuestionAPIUrl}/${id}`);
};

export const getQuestionByTestId = async (id: number) => {
  return await axiosAuthInstance.get(`${QuestionAPIUrl}/test/${id}`);
};

export const getRandomQuestionByTestId = async (id: number) => {
  return await axiosAuthInstance.get(`${QuestionAPIUrl}/test/random/${id}`);
};

export const postQuestion = async (data: QuestionCreateInterface) => {
  return await axiosAuthInstance.post(`${QuestionAPIUrl}`, data);
};

export const patchQuestion = async (data: QuestionEditInterface) => {
  return await axiosAuthInstance.put(
    `${QuestionAPIUrl}/${data.id_question}`,
    data,
  );
};

export const deleteQuestion = async (id: number) => {
  return await axiosAuthInstance.delete(`${QuestionAPIUrl}/${id}`);
};
