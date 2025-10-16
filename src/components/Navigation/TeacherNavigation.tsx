import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { CalendarClock, Edit, LogOut, User } from "lucide-react";
import { HomeOutlined, NotificationOutlined } from "@ant-design/icons";

const TeacherNavigation: React.FC = () => {
    const location = useLocation();

    return(
        <div className="z-50 w-60 fixed top-0 left-0 p-4 flex flex-col justify-between h-screen bg-second-custom">
            <Link  to="/admin/home" className="font-extrabold text-center">E-exam</Link>
            <div className="flex flex-col gap-2 font-medium w-full">
                <Link to="/teacher/home">
                    <Button className="w-full" variant={location.pathname === "/teacher/home" ? 'secondary' : 'ghost'}><HomeOutlined /> Accueil</Button>
                </Link>
                <Link to="/teacher/announce">
                    <Button className="w-full" variant={location.pathname === "/teacher/announce" ? 'secondary' : 'ghost'}><NotificationOutlined /> Annonce</Button>
                </Link>
                <Link to="/teacher/test">
                    <Button className="w-full" variant={location.pathname === "/teacher/test" ? 'secondary' : 'ghost'}><CalendarClock /> Test</Button>
                </Link>
                <Link to="/admin/account">
                    <Button className="w-full" variant={location.pathname === "/admin/account" ? 'secondary' : 'ghost'}><Edit /> Correction</Button>
                </Link>
            </div>
            <div className="w-52 flex flex-col gap-2">
                <Button variant={'ghost'}><User /> antsafider@gmail.com</Button>
                <Button variant={'ghost'}><LogOut /> Deconnecter</Button>
            </div>
        </div>
    )
}

export default TeacherNavigation;