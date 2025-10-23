import { LoginInterface, SignupInterface } from "@/interfaces/user.interface";
import axiosAuthInstance, { axiosInstance } from "./Config";
import { showToast } from "@/utils/Toast";
import { TOAST_TYPE } from "@/constants/ToastType";
import { HttpStatus } from "@/constants/Http_status";

const UserAPIUrl = `${import.meta.env.VITE_BASE_URL}/auth`;
const AdminUserAPIUrl = `${import.meta.env.VITE_BASE_URL}/admin`;

export const postLogin = async (data: LoginInterface) => {
  try {
    return await axiosInstance.post(`${UserAPIUrl}/login`, data);
  } catch (error: any) {
    if(error?.status == HttpStatus.BAD_REQUEST || error?.status == HttpStatus.UNAUTHORIZED) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: error?.response.data.message
      })
    } else if (error.code == "ERR_NETWORK") {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la connexion au serveur !"
      })
    }
  }
};

export const postInscription = async (data: SignupInterface) => {
  return await axiosInstance.post(`${UserAPIUrl}/register`, data)
};

export const getAllUser = async () => {
  return await axiosAuthInstance.get(`${AdminUserAPIUrl}/users`)
};

export const getUserById = async (id: string) => {
  return await axiosAuthInstance.get(`${UserAPIUrl}/${id}`)
};

export const patchUserValidation = async (data: any) => {
  return await axiosAuthInstance.post(`${AdminUserAPIUrl}/users/approve/${data}`)
};
