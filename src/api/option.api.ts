import { OptionCreateInterface } from "@/interfaces/option.interface";
import axiosAuthInstance from "./Config"
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const OptionAPIUrl = `${import.meta.env.VITE_BASE_URL}/option`;

export const postOption = async (data: OptionCreateInterface) => {
  // return await axiosAuthInstance.post(`${OptionAPIUrl}/create`, data)

    initMockAdapter();
  return await mockedAxios.post(`/option/`, data);
}

export const getOptionByQuestionId = async (id: number) => {
  // return await axiosAuthInstance.get(`${OptionAPIUrl}/question/${id}`)

    initMockAdapter();
  return await mockedAxios.get(`/option/question/${id}`);
}

export const deleteOption = async (id: number) => {
  // return await axiosAuthInstance.delete(`${OptionAPIUrl}/delete/${id}`)

    initMockAdapter();
  return await mockedAxios.delete(`/option/${id}`);
}