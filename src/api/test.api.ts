import {
  TestCreateInterface,
  TestEditInterface,
} from "@/interfaces/test.interface";
import axiosAuthInstance from "./Config";

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
  return await axiosAuthInstance.get(`${TestAPIUrl}/need_correction/${id}`)
};

export const getAllCorrectedTest = async () => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/all_corrected`);
};

export const getAllCorrectedTestForAdmin = async () => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/all_corrected/admin`);
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

export const putTestToFinishStatus = async (id: string) => {
  return await axiosAuthInstance.put(`${TestAPIUrl}/finish/${id}`)
};

export const patchTest = async (data: TestEditInterface) => {
  return await axiosAuthInstance.put(`${TestAPIUrl}/${data.id_test}`, data)
};
