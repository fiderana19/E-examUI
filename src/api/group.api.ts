import {
  AddGroupInterface,
  EditGroupInterface,
} from "@/interfaces/groupe.interface";
import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const GroupAPIUrl = `${import.meta.env.VITE_BASE_URL}/groupe`;

export const getAllGroup = async () => {
  // return await axiosAuthInstance.get(`${GroupAPIUrl}/all`)

  initMockAdapter();
  return await mockedAxios.get("/groupe");
};

export const getGroupById = async (id: number) => {
  // return await axiosAuthInstance.get(`${GroupAPIUrl}/get/${id}`)

  initMockAdapter();
  return await mockedAxios.get(`/groupe/${id}`);
};

export const postGroup = async (data: AddGroupInterface) => {
  // return await axiosAuthInstance.post(`${GroupAPIUrl}/create`, data)

  initMockAdapter();
  return await mockedAxios.post("/groupe", data);
};

export const patchGroup = async (data: EditGroupInterface) => {
  // return await axiosAuthInstance.patch(`${GroupAPIUrl}/edit/${data.id_groupe}`, data)

  initMockAdapter();
  return await mockedAxios.put(`/groupe/${data.id_groupe}`, data);
};

export const deleteGroup = async (id: number) => {
  // return await axiosAuthInstance.delete(`${GroupAPIUrl}/delete/${id}`)

  initMockAdapter();
  return await mockedAxios.delete(`/groupe/${id}`);
};
