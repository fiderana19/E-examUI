import {
  TestCreateInterface,
  TestEditInterface,
} from "@/interfaces/test.interface";
import axiosAuthInstance from "./Config";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const TestAPIUrl = `${import.meta.env.VITE_BASE_URL}/tests`;

export const getTestById = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/${id}`)
};

export const getActiveTestByGroupId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/groupe/${id}`)
};

export const getTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/user/${id}`)
};

export const getTestForCorrectionByTeacherId = async (id: number) => {
  // return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/correction/${id}`)

  initMockAdapter();
  return await mockedAxios.get(`/test/teacher/${id}`);
};

export const getNoCorrectionTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/final/${id}`);
};

export const getFinishedTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/finish/${id}`);
};

export const deleteTest = async (id: number) => {
  return await axiosAuthInstance.delete(`${TestAPIUrl}/${id}`)
};

export const launchTest = async (id: number) => {
  return await axiosAuthInstance.put(`${TestAPIUrl}/launch/${id}`)
};

export const postTest = async (data: TestCreateInterface) => {
  return await axiosAuthInstance.post(`${TestAPIUrl}`, data)
};

export const patchTest = async (data: TestEditInterface) => {
  return await axiosAuthInstance.put(`${TestAPIUrl}/${data.id_test}`, data)
};
