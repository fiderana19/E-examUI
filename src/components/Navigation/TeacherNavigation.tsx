import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { BookText, CalendarClock, Edit, LogOut, User } from "lucide-react";
import { HomeOutlined, NotificationOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import { useGetUserById } from "@/hooks/user/useGetUserById";

const TeacherNavigation: React.FC = () => {
  const location = useLocation();
  const { logout, token } = useAuth();
  const { data: user, refetch } = useGetUserById(
    token ? JSON.parse(atob(token.split(".")[1])).id : "",
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="z-50 w-60 fixed top-0 left-0 p-4 flex flex-col justify-between h-screen bg-second-custom">
      <Link to="/admin/home" className="font-extrabold text-center">
        E-exam
      </Link>
      <div className="flex flex-col gap-2 font-medium w-full">
        <Link to="/teacher/home">
          <Button
            className="w-full"
            variant={
              location.pathname === "/teacher/home" ? "secondary" : "ghost"
            }
          >
            <HomeOutlined /> Accueil
          </Button>
        </Link>
        <Link to="/teacher/announce">
          <Button
            className="w-full"
            variant={
              location.pathname === "/teacher/announce" ? "secondary" : "ghost"
            }
          >
            <NotificationOutlined /> Annonce
          </Button>
        </Link>
        <Link to="/teacher/test">
          <Button
            className="w-full"
            variant={
              location.pathname === "/teacher/test" ? "secondary" : "ghost"
            }
          >
            <CalendarClock /> Test
          </Button>
        </Link>
        <Link to="/teacher/correction">
          <Button
            className="w-full"
            variant={
              location.pathname === "/teacher/correction"
                ? "secondary"
                : "ghost"
            }
          >
            <Edit /> Correction
          </Button>
        </Link>
        <Link to="/teacher/result">
          <Button
            className="w-full"
            variant={
              location.pathname === "/teacher/result" ? "secondary" : "ghost"
            }
          >
            <BookText /> Resultat
          </Button>
        </Link>
      </div>
      <div className="w-52 flex flex-col gap-2">
        <Link to="/teacher/profile">
          {user && (
            <Button
              className="w-full"
              variant={
                location.pathname === "/teacher/profile" ? "secondary" : "ghost"
              }
            >
              <User /> {user && user.email}{" "}
            </Button>
          )}
        </Link>
        <Button onClick={() => logout()} variant={"ghost"}>
          <LogOut /> Deconnecter
        </Button>
      </div>
    </div>
  );
};

export default TeacherNavigation;
