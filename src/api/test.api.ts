import { TestCreateInterface, TestEditInterface } from "@/interfaces/test.interface";
import axiosAuthInstance from "./Config"
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const TestAPIUrl = `${import.meta.env.VITE_BASE_URL}/test`;

export const getTestById = async (id: number) => {
  // return await axiosAuthInstance.get(`${TestAPIUrl}/get/${id}`)

        initMockAdapter();
  return await mockedAxios.get(`/test/${id}`);
}

export const getTestByTeacherId = async (id: number) => {
  // return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/${id}`)

        initMockAdapter();
  return await mockedAxios.get(`/test/utilisateur/${id}`);
}

export const getTestForCorrectionByTeacherId = async (id: number) => {
  // return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/correction/${id}`)

          initMockAdapter();
  return await mockedAxios.get(`/test/teacher/${id}`);
}

export const getNoCorrectionTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/final/${id}`)
}

export const getFinishedTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/finish/${id}`)
}

export const deleteTest = async (id: number) => {
  // return await axiosAuthInstance.delete(`${TestAPIUrl}/delete/${id}`)

          initMockAdapter();
  return await mockedAxios.delete(`/test/${id}`);
}

export const launchTest = async (id: number) => {
  // return await axiosAuthInstance.patch(`${TestAPIUrl}/launch/${id}`)

            initMockAdapter();
  return await mockedAxios.put(`/test/${id}/declenchement`);
}

export const postTest = async (data: TestCreateInterface) => {
  // return await axiosAuthInstance.post(`${TestAPIUrl}/create`, data)

          initMockAdapter();
  return await mockedAxios.post(`/test/`, data);
}

export const patchTest = async (data: TestEditInterface) => {
  // return await axiosAuthInstance.patch(`${TestAPIUrl}/edit/${data.id_test}`, data)

          initMockAdapter();
  return await mockedAxios.put(`/test/${data?.id_test}`, data);
}