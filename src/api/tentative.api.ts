import { TentativeCreateInterface } from "@/interfaces/tentative.interface";
import axiosAuthInstance from "./Config";

const TentativeAPIUrl = `${import.meta.env.VITE_BASE_URL}/tentatives`;

export const postTentative = async (data: TentativeCreateInterface) => {
  return await axiosAuthInstance.post(`${TentativeAPIUrl}`, data);
};

export const patchTentativeForFinish = async (data: {
  id_tentative: number;
  heure_soumission: string;
}) => {
  return await axiosAuthInstance.put(`${TentativeAPIUrl}/${data.id_tentative}`, {
    heure_soumission: data.heure_soumission,
  });
};

export const getTentativeForResultByTestId = async (id: any) => {
  return await axiosAuthInstance.get(
    `${import.meta.env.VITE_BASE_URL}/tests/results/${id}`,
  );
};

export const getTentativeResponseByTestId = async (id: any) => {
  return await axiosAuthInstance.get(`${TentativeAPIUrl}/responses/${id}`);
};
