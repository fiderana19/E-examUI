import { PostCreateInterface } from "@/interfaces/post.interface";
import axiosAuthInstance, { axiosMutlipartFormDataInstance } from "./Config";

const ResultAPIUrl = `${import.meta.env.VITE_BASE_URL}/resultats`;

export const getAllResult = async () => {
  return await axiosAuthInstance.get(`${ResultAPIUrl}`);
};

export const getResultByGroupId = async (id: string) => {
  return await axiosAuthInstance.get(`${ResultAPIUrl}/groupe/${id}`);
};

export const dowloadResult = async (id: number) => {
  return await axiosAuthInstance.get(`${ResultAPIUrl}/download/${id}`, {
    responseType: 'blob'
});
};

export const postResult = async (data: PostCreateInterface) => {
  return await axiosMutlipartFormDataInstance.post(`${ResultAPIUrl}`, data);
};

export const deleteResult = async (id: number) => {
  return await axiosAuthInstance.delete(`${ResultAPIUrl}/${id}`);
};
