import { OptionCreateInterface } from "@/interfaces/option.interface";
import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const OptionAPIUrl = `${import.meta.env.VITE_BASE_URL}/options`;

export const postOption = async (data: OptionCreateInterface) => {
  return await axiosAuthInstance.post(`${OptionAPIUrl}`, data)
};

export const getOptionByQuestionId = async (id: number) => {
  return await axiosAuthInstance.get(`${OptionAPIUrl}/question/${id}`)
};

export const deleteOption = async (id: number) => {
  return await axiosAuthInstance.delete(`${OptionAPIUrl}/${id}`)
};
