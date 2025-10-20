import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpStatus } from "../constants/Http_status";
import { ToastContainer } from "react-toastify";
import { LoginInterface } from "@/interfaces/user.interface";
import { postLogin } from "@/api/user.api";

type AuthContextProps = {
  token?: string | null;
  isAuthenticated?: boolean;
  login: (data: LoginInterface) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const login = async (loginCredentials: LoginInterface) => {
    const response = await postLogin(loginCredentials);
    if (
      response?.status === HttpStatus.OK ||
      response?.status === HttpStatus.CREATED
    ) {
      const data = response?.data.token;

      setToken(data);
      localStorage.setItem("token", data);

      const decodedToken = data.split("/")[1];
      if (decodedToken === "admin") {
        navigate("/admin/home");
      } else if (decodedToken === "teacher") {
        navigate("/teacher/home");
      } else {
        navigate("/student/home");
      }
    }
  };

  async function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of a AuthProvider");
  }
  return context;
}
