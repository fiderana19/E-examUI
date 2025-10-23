import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { UserOutlined } from "@ant-design/icons";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGetUserById } from "@/hooks/user/useGetUserById";

const StudentNavigation: React.FC = () => {
  const { logout, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, refetch } = useGetUserById(token ? JSON.parse(atob(token.split(".")[1])).id : "");

  useEffect(() => {
    refetch();
  }, [])
  return (
    <div className="z-40 fixed w-full px-4 top-0 left-0 flex justify-between items-center bg-second-custom text-center">
      <Link to="/student/home" className="font-extrabold">
        E-exam
      </Link>
      <div className="flex gap-8 items-center font-medium ">
        <Link
          to="/student/home"
          className={`${location.pathname === "/student/home" ? "border-b-white text-white" : "border-b-transparent"} hover:border-b-white hover:text-white border-b-4 py-4 transition-all duration-300`}
        >
          Accueil
        </Link>
        <Link
          to="/student/announce"
          className={`${location.pathname === "/student/announce" ? "border-b-white text-white" : "border-b-transparent"} hover:border-b-white hover:text-white border-b-4 py-4 transition-all duration-300`}
        >
          Annonce
        </Link>
        <Link
          to="/student/test"
          className={`${location.pathname === "/student/test" ? "border-b-white text-white" : "border-b-transparent"} hover:border-b-white hover:text-white border-b-4 py-4 transition-all duration-300`}
        >
          Test
        </Link>
        <Link
          to="/student/result"
          className={`${location.pathname === "/student/result" ? "border-b-white text-white" : "border-b-transparent"} hover:border-b-white hover:text-white border-b-4 py-4 transition-all duration-300`}
        >
          Resultat
        </Link>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          {user && (
            <Button variant={"outline"}>
              <UserOutlined />
              {user.email}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 mr-4">
          <div className="mb-2 text-gray-700 font-medium">Menu</div>
          <div className="w-52 flex flex-col gap-2">
            <Button
              onClick={() => navigate("/student/profile")}
              variant={"outline"}
            >
              <UserOutlined /> Profile
            </Button>
            <Button onClick={() => logout()} variant={"outline"}>
              <LogOut /> Deconnecter
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StudentNavigation;
