import axiosAuthInstance from "./Config"

const TentativeAPIUrl = `${import.meta.env.VITE_BASE_URL}/test`;

export const postTentative = async (data: any) => {
  return await axiosAuthInstance.post(`${TentativeAPIUrl}/create`, data)
}

export const patchTentativeForFinish = async (data: any) => {
  return await axiosAuthInstance.patch(`${TentativeAPIUrl}/finish/${data.id_tentative}`, data)
}

export const getTentativeForResultByTestId = async (id: any) => {
  return await axiosAuthInstance.get(`${TentativeAPIUrl}/result/${id}`)
}
