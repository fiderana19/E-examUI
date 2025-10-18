import { LoginInterface, SignupInterface } from "@/interfaces/user.interface"
import axiosAuthInstance, { axiosInstance } from "./Config"
import { showToast } from "@/utils/Toast";
import { TOAST_TYPE } from "@/constants/ToastType";
import { HttpStatus } from "@/constants/Http_status";
import mockedAxios, { initMockAdapter } from "./mock/axios.mock";

const UserAPIUrl = `${import.meta.env.VITE_BASE_URL}/user`;

export const postLogin = async (data: LoginInterface) => {
  // try {
  //   return await axiosInstance.post(`${UserAPIUrl}/login`, data);
  // } catch (error: any) {
  //   if(error?.status == HttpStatus.BAD_REQUEST || error?.status == HttpStatus.UNAUTHORIZED) {
  //     showToast({
  //       type: TOAST_TYPE.ERROR,
  //       message: error?.response.data.message
  //     })
  //   } else if (error.code == "ERR_NETWORK") {
  //     showToast({
  //       type: TOAST_TYPE.ERROR,
  //       message: "Erreur lors de la connexion au serveur !"
  //     })
  //   }
  // }
  initMockAdapter();
  return await mockedAxios.post('/utilisateur/connexion', data);
}

export const postInscription = async (data: SignupInterface) => {
    // return await axiosInstance.post(`${UserAPIUrl}/signup`, data)
    initMockAdapter();
    return await mockedAxios.post('/utilisateur/inscription', data);
}

export const getAllUser = async () => {
    // return await axiosAuthInstance.get(`${UserAPIUrl}/all`)
    initMockAdapter();
    return await mockedAxios.get('/utilisateur');
}

export const getUserById = async (id: string) => {
    // return await axiosAuthInstance.get(`${UserAPIUrl}/get/${id}`)

    initMockAdapter();
    return await mockedAxios.get(`/utilisateur/${id}`);
}

export const patchUserValidation = async (data: any) => {
    // return await axiosAuthInstance.patch(`${UserAPIUrl}/validation`, data)
  
    initMockAdapter();
    return await mockedAxios.put(`/utilisateur/${data.id}/validation`, { est_valider: true });
}