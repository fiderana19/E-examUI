import { PostCreateInterface } from "@/interfaces/post.interface";
import axiosAuthInstance from "./Config"

const ResultAPIUrl = `${import.meta.env.VITE_BASE_URL}/result`;

export const getAllResult = async () => {
  return await axiosAuthInstance.get(`${ResultAPIUrl}/all`)
}

export const getResultByGroupId = async (id: number) => {
  return await axiosAuthInstance.get(`${ResultAPIUrl}/group/${id}`)
}

export const postResult = async (data: PostCreateInterface) => {
  return await axiosAuthInstance.post(`${ResultAPIUrl}/create`, data)
}

export const deleteResult = async (id: number) => {
  return await axiosAuthInstance.delete(`${ResultAPIUrl}/delete/${id}`)
}