import {
  AddGroupInterface,
  EditGroupInterface,
} from "@/interfaces/groupe.interface";
import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const GroupAPIUrl = `${import.meta.env.VITE_BASE_URL}/groupes`;

export const getAllGroup = async () => {
  return await axiosAuthInstance.get(`${GroupAPIUrl}`)
};

export const getGroupById = async (id: number) => {
  return await axiosAuthInstance.get(`${GroupAPIUrl}/${id}`)
};

export const postGroup = async (data: AddGroupInterface) => {
  return await axiosAuthInstance.post(`${GroupAPIUrl}`, data)
};

export const patchGroup = async (data: EditGroupInterface) => {
  return await axiosAuthInstance.put(`${GroupAPIUrl}/${data.id_groupe}`, data)
};

export const deleteGroup = async (id: number) => {
  return await axiosAuthInstance.delete(`${GroupAPIUrl}/${id}`)
};
