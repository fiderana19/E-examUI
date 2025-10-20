import {
  AnnounceAddInterface,
  AnnounceEditInterface,
} from "@/interfaces/announce.interface";
import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";
import { data } from "react-router-dom";

const AnnonceAPIUrl = `${import.meta.env.VITE_BASE_URL}/annonce`;

export const getAnnonceByGroupId = async (id: number) => {
  // return await axiosAuthInstance.get(`${AnnonceAPIUrl}/group/${id}`)

  initMockAdapter();
  return await mockedAxios.get(`/annonce/groupe/${id}`);
};

export const getAnnonceByUserId = async (id: number) => {
  // return await axiosAuthInstance.get(`${AnnonceAPIUrl}/user/${id}`)

  initMockAdapter();
  return await mockedAxios.get(`/annonce/${id}`);
};

export const postAnnonce = async (data: AnnounceAddInterface) => {
  // return await axiosAuthInstance.post(`${AnnonceAPIUrl}/create`, data)

  initMockAdapter();
  return await mockedAxios.post(`/annonce/`, data);
};

export const patchAnnonce = async (data: AnnounceEditInterface) => {
  // return await axiosAuthInstance.patch(`${AnnonceAPIUrl}/edit`, data)

  initMockAdapter();
  return await mockedAxios.put(`/annonce/${data.id_annonce}`, data);
};

export const deleteAnnonce = async (id: number) => {
  // return await axiosAuthInstance.delete(`${AnnonceAPIUrl}/delete/${id}`)

  initMockAdapter();
  return await mockedAxios.delete(`/annonce/${id}`);
};
