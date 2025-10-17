import { AnnounceAddInterface, AnnounceEditInterface } from "@/interfaces/announce.interface";
import axiosAuthInstance from "./Config"

const AnnonceAPIUrl = `${import.meta.env.VITE_BASE_URL}/annonce`;

export const getAnnonceByGroupId = async (id: number) => {
  return await axiosAuthInstance.get(`${AnnonceAPIUrl}/group/${id}`)
}

export const getAnnonceByUserId = async (id: number) => {
  return await axiosAuthInstance.get(`${AnnonceAPIUrl}/user/${id}`)
}

export const postAnnonce = async (data: AnnounceAddInterface) => {
  return await axiosAuthInstance.post(`${AnnonceAPIUrl}/create`, data)
}

export const patchAnnonce = async (data: AnnounceEditInterface) => {
  return await axiosAuthInstance.patch(`${AnnonceAPIUrl}/edit`, data)
}

export const deleteAnnonce = async (id: number) => {
  return await axiosAuthInstance.delete(`${AnnonceAPIUrl}/delete/${id}`)
}