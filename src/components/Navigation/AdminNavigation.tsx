import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { BookOutlined, ClockCircleOutlined, HomeOutlined, NotificationOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";

const AdminNavigation: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    return(
        <div className="z-50 w-60 fixed top-0 left-0 p-4 flex flex-col justify-between h-screen bg-second-custom">
            <Link  to="/admin/home" className="font-extrabold text-center">E-exam</Link>
            <div className="flex flex-col gap-2 font-medium w-full">
                <Link to="/admin/home">
                    <Button className="w-full" variant={location.pathname === "/admin/home" ? 'secondary' : 'ghost'}><HomeOutlined /> Accueil</Button>
                </Link>
                <Link to="/admin/groupe">
                    <Button className="w-full" variant={location.pathname === "/admin/groupe" ? 'secondary' : 'ghost'}><BookOutlined /> Groupe</Button>
                </Link>
                <Link to="/admin/account">
                    <Button className="w-full" variant={location.pathname === "/admin/account" ? 'secondary' : 'ghost'}><UserSwitchOutlined /> Compte</Button>
                </Link>
                <Link to="/admin/result">
                    <Button className="w-full" variant={location.pathname === "/admin/result" ? 'secondary' : 'ghost'}><NotificationOutlined /> Publication</Button>
                </Link>
                <Link to="/admin/history">
                    <Button className="w-full" variant={location.pathname === "/admin/history" ? 'secondary' : 'ghost'}><ClockCircleOutlined /> Historique</Button>
                </Link>
            </div>
            <div className="w-52 flex flex-col gap-2">
                <Button onClick={() => logout()} variant={'ghost'}><LogOut /> Deconnecter</Button>
            </div>
        </div>
    )
}

export default AdminNavigation;