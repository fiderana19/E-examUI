import axiosAuthInstance from "./Config"

const OptionAPIUrl = `${import.meta.env.VITE_BASE_URL}/option`;

export const getOptionByQuestionId = async (id: number) => {
  return await axiosAuthInstance.get(`${OptionAPIUrl}/question/${id}`)
}

export const deleteOption = async (id: number) => {
  return await axiosAuthInstance.delete(`${OptionAPIUrl}/delete/${id}`)
}