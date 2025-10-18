import { PostCreateInterface } from "@/interfaces/post.interface";
import axiosAuthInstance from "./Config"
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const ResultAPIUrl = `${import.meta.env.VITE_BASE_URL}/result`;

export const getAllResult = async () => {
  // return await axiosAuthInstance.get(`${ResultAPIUrl}/all`)

          initMockAdapter();
  return await mockedAxios.get(`/resultat/`);
}

export const getResultByGroupId = async (id: number) => {
  // return await axiosAuthInstance.get(`${ResultAPIUrl}/group/${id}`)

          initMockAdapter();
  return await mockedAxios.get(`/resultat/groupe/${id}`);
}

export const postResult = async (data: PostCreateInterface) => {
  // return await axiosAuthInstance.post(`${ResultAPIUrl}/create`, data)

          initMockAdapter();
  return await mockedAxios.post(`/resultat/`, data);
}

export const deleteResult = async (id: number) => {
  // return await axiosAuthInstance.delete(`${ResultAPIUrl}/delete/${id}`)

          initMockAdapter();
  return await mockedAxios.delete(`/resultat/${id}`);
}