import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { BookOutlined, HomeOutlined, UserSwitchOutlined } from "@ant-design/icons";

const AdminNavigation: React.FC = () => {

    return(
        <div className="z-50 w-60 fixed top-0 left-0 p-4 flex flex-col justify-between h-screen bg-second-custom">
            <Link  to="/student/home" className="font-extrabold text-center">E-exam</Link>
            <div className="flex flex-col gap-2 font-medium w-full">
                <Link to="/admin/home">
                    <Button className="w-full" variant={'secondary'}><HomeOutlined /> Accueil</Button>
                </Link>
                <Link to="/admin/groupe">
                    <Button className="w-full" variant={'ghost'}><BookOutlined /> Groupe</Button>
                </Link>
                <Link to="/admin/home">
                    <Button className="w-full" variant={'ghost'}><UserSwitchOutlined /> Compte</Button>
                </Link>
            </div>
            <div className="w-52 flex flex-col gap-2">
                <Button variant={'ghost'}><LogOut /> Deconnecter</Button>
            </div>
        </div>
    )
}

export default AdminNavigation;