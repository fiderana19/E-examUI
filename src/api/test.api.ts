import { TestCreateInterface, TestEditInterface } from "@/interfaces/test.interface";
import axiosAuthInstance from "./Config"

const TestAPIUrl = `${import.meta.env.VITE_BASE_URL}/test`;

export const getTestById = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/get/${id}`)
}

export const getTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/${id}`)
}

export const getTestForCorrectionByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/correction/${id}`)
}

export const getNoCorrectionTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/final/${id}`)
}

export const getFinishedTestByTeacherId = async (id: number) => {
  return await axiosAuthInstance.get(`${TestAPIUrl}/teacher/finish/${id}`)
}

export const deleteTest = async (id: number) => {
  return await axiosAuthInstance.delete(`${TestAPIUrl}/delete/${id}`)
}

export const launchTest = async (id: number) => {
  return await axiosAuthInstance.patch(`${TestAPIUrl}/launch/${id}`)
}

export const postTest = async (data: TestCreateInterface) => {
  return await axiosAuthInstance.post(`${TestAPIUrl}/create`, data)
}

export const patchTest = async (data: TestEditInterface) => {
  return await axiosAuthInstance.patch(`${TestAPIUrl}/edit/${data.id_test}`, data)
}