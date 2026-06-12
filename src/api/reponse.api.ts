import { CreateResponseInterface } from "@/interfaces/response.interface";
import axiosAuthInstance from "./Config";

const ReponseAPIUrl = `${import.meta.env.VITE_BASE_URL}/reponses`;

export const getNotCorrectedReponse = async () => {
  return await axiosAuthInstance.get(`${ReponseAPIUrl}/non-corrigees`);
};

export const postReponse = async (data: CreateResponseInterface) => {
  return await axiosAuthInstance.post(`${ReponseAPIUrl}`, data);
};

export const patchReponse = async (data: any) => {
  return await axiosAuthInstance.put(`${ReponseAPIUrl}/${data.id_reponse}/texte`, data);
};

export const patchNoterReponse = async (data: any) => {
  return await axiosAuthInstance.put(`${ReponseAPIUrl}/corriger/${data.id_reponse}`, data);
};

export const getReponseByTentativeId = async (id: number) => {
  return await axiosAuthInstance.get(`${import.meta.env.VITE_BASE_URL}/tentatives/responses/${id}`);
};

export const getReponseByTestId = async (id: number) => {
  return await axiosAuthInstance.get(`${ReponseAPIUrl}/test/${id}`);
};

export const getReponseById = async (id: number) => {
  return await axiosAuthInstance.get(`${ReponseAPIUrl}/${id}`);
};

export const patchReponseForCorrection = async (data: any) => {
  return await axiosAuthInstance.put(
    `${ReponseAPIUrl}/corriger/${data.id_reponse}`,
    data,
  );
};
