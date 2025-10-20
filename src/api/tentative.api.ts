import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const TentativeAPIUrl = `${import.meta.env.VITE_BASE_URL}/test`;

export const postTentative = async (data: any) => {
  // return await axiosAuthInstance.post(`${TentativeAPIUrl}/create`, data)

  initMockAdapter();
  return await mockedAxios.post(`/tentative/`, data);
};

export const patchTentativeForFinish = async (data: any) => {
  // return await axiosAuthInstance.patch(`${TentativeAPIUrl}/finish/${data.id_tentative}`, data)

  initMockAdapter();
  return await mockedAxios.put(`/tentative/${data}/terminer`, data);
};

export const getTentativeForResultByTestId = async (id: any) => {
  // return await axiosAuthInstance.get(`${TentativeAPIUrl}/result/${id}`)

  initMockAdapter();
  return await mockedAxios.get(`/tentative/test/${id}`);
};
