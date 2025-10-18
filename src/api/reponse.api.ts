import axiosAuthInstance from "./Config"
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const ReponseAPIUrl = `${import.meta.env.VITE_BASE_URL}/response`;

export const getNotCorrectedReponse = async () => {
  // return await axiosAuthInstance.get(`${ReponseAPIUrl}/need/correction`)
  
      initMockAdapter();
  return await mockedAxios.get(`/reponse/non-corriger`);
}

export const postReponse = async (data: any) => {
  // return await axiosAuthInstance.post(`${ReponseAPIUrl}/create`, data)

      initMockAdapter();
  return await mockedAxios.post(`/reponse/`, data);
}

export const patchReponse = async (data: any) => {
  // return await axiosAuthInstance.patch(`${ReponseAPIUrl}/edit/${data.id_reponse}`, data)


      initMockAdapter();
  return await mockedAxios.put(`/reponse/${data.id_reponse}/text`, data);
}

export const patchNoterReponse = async (data: any) => {
  // return await axiosAuthInstance.patch(`${ReponseAPIUrl}/edit/${data.id_reponse}`, data)


      initMockAdapter();
  return await mockedAxios.put(`/reponse/${data.id_reponse}/score`, data);
}


export const getReponseByTentativeId = async (id: number) => {
  // return await axiosAuthInstance.get(`${ReponseAPIUrl}/tentative/${id}`)

      initMockAdapter();
  return await mockedAxios.get(`/reponse/tentative/${id}`);
}

export const getReponseById = async (id: number) => {
  // return await axiosAuthInstance.get(`${ReponseAPIUrl}/get/${id}`)

      initMockAdapter();
  return await mockedAxios.get(`/reponse/${id}`);
}

export const patchReponseForCorrection = async (data: any) => {
  // return await axiosAuthInstance.patch(`${ReponseAPIUrl}/correction/${data.id_reponse}`, data)

      initMockAdapter();
  return await mockedAxios.get(`/reponse/tentative/${data}`);
}