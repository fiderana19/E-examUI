import { EditGroupInterface } from "@/interfaces/groupe.interface";
import axiosAuthInstance from "./Config"

const GroupAPIUrl = `${import.meta.env.VITE_BASE_URL}/groupe`;

export const getAllGroup = async () => {
  return await axiosAuthInstance.get(`${GroupAPIUrl}/all`)
}

export const getGroupById = async (id: number) => {
  return await axiosAuthInstance.get(`${GroupAPIUrl}/get/${id}`)
}

export const patchGroup = async (data: EditGroupInterface) => {
  return await axiosAuthInstance.patch(`${GroupAPIUrl}/edit/${data.id_groupe}`, data)
}

export const deleteGroup = async (id: number) => {
  return await axiosAuthInstance.delete(`${GroupAPIUrl}/delete/${id}`)
}
