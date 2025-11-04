import { TentativeCreateInterface } from "@/interfaces/tentative.interface";
import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const TentativeAPIUrl = `${import.meta.env.VITE_BASE_URL}/tentatives`;

export const postTentative = async (data: TentativeCreateInterface) => {
  return await axiosAuthInstance.post(`${TentativeAPIUrl}`, data)
};

export const patchTentativeForFinish = async (data: any) => {
  // return await axiosAuthInstance.patch(`${TentativeAPIUrl}/finish/${data.id_tentative}`, data)

  initMockAdapter();
  return await mockedAxios.put(`/tentative/${data}/terminer`, data);
};

export const getTentativeForResultByTestId = async (id: any) => {
  return await axiosAuthInstance.get(`${import.meta.env.VITE_BASE_URL}/tests/results/${id}`)
};
