import axiosAuthInstance from "./Config"

const ReponseAPIUrl = `${import.meta.env.VITE_BASE_URL}/response`;

export const getNotCorrectedReponse = async () => {
  return await axiosAuthInstance.get(`${ReponseAPIUrl}/need/correction`)
}

export const postReponse = async (data: any) => {
  return await axiosAuthInstance.post(`${ReponseAPIUrl}/create`, data)
}

export const patchReponse = async (data: any) => {
  return await axiosAuthInstance.patch(`${ReponseAPIUrl}/edit/${data.id_reponse}`, data)
}

export const getReponseByTentativeId = async (id: number) => {
  return await axiosAuthInstance.get(`${ReponseAPIUrl}/tentative/${id}`)
}

export const getReponseById = async (id: number) => {
  return await axiosAuthInstance.get(`${ReponseAPIUrl}/get/${id}`)
}

export const patchReponseForCorrection = async (data: any) => {
  return await axiosAuthInstance.patch(`${ReponseAPIUrl}/correction/${data.id_reponse}`, data)
}