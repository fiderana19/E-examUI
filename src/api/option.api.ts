import { OptionCreateInterface } from "@/interfaces/option.interface";
import axiosAuthInstance from "./Config"

const OptionAPIUrl = `${import.meta.env.VITE_BASE_URL}/option`;

export const postOption = async (data: OptionCreateInterface) => {
  return await axiosAuthInstance.post(`${OptionAPIUrl}/create`, data)
}

export const getOptionByQuestionId = async (id: number) => {
  return await axiosAuthInstance.get(`${OptionAPIUrl}/question/${id}`)
}

export const deleteOption = async (id: number) => {
  return await axiosAuthInstance.delete(`${OptionAPIUrl}/delete/${id}`)
}