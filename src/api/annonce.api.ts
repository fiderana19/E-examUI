import {
  AnnounceAddInterface,
  AnnounceEditInterface,
} from "@/interfaces/announce.interface";
import axiosAuthInstance from "./Config";

const AnnonceAPIUrl = `${import.meta.env.VITE_BASE_URL}/annonces`;

export const getAnnonceByGroupId = async (id: number) => {
  return await axiosAuthInstance.get(`${AnnonceAPIUrl}/groupe/${id}`)
};

export const getAnnonceByUserId = async (id: number) => {
  return await axiosAuthInstance.get(`${AnnonceAPIUrl}/utilisateur/${id}`)
};

export const getAnnonceById = async (id: number) => {
  return await axiosAuthInstance.get(`${AnnonceAPIUrl}/${id}`)
};

export const postAnnonce = async (data: AnnounceAddInterface) => {
  return await axiosAuthInstance.post(`${AnnonceAPIUrl}`, data)
};

export const patchAnnonce = async (data: AnnounceEditInterface) => {
  return await axiosAuthInstance.put(`${AnnonceAPIUrl}/${data?.id_annonce}`, data)
};

export const deleteAnnonce = async (id: number) => {
  return await axiosAuthInstance.delete(`${AnnonceAPIUrl}/${id}`)
};
