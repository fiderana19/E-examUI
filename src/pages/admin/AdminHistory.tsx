import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Input } from "@/components/ui/input";
import { CloseOutlined } from "@ant-design/icons";
import { BookText } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHistory: React.FC  = () => {
    const navigate = useNavigate();

    return <div className="pl-64 pr-6">
        <AdminNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center">
                <div className="text-xl uppercase font-bold"> Les resultats dejà corrigés</div>
                <Input className="w-48" placeholder="Filter..." />
            </div>
            <div className="w-max mx-auto text-center text-gray-600 my-10 hidden">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Vous avez aucune resultat</div>
            </div>
            <div className="">
                <div onClick={() =>navigate("/admin/history/view")} className="shadow p-4 bg-white my-2 cursor-pointer">
                    <div className="flex justify-between">
                        <div className="flex gap-4 text-lg">
                            <div className="">Test de HTML du</div>
                            <div className="text-gray-800 font-bold">
                                2025-12-12
                            </div>
                        </div>
                        <div className="font-bold text-gray-800">M1</div>
                    </div>
                </div>
                <div className="shadow p-4 bg-white my-2 cursor-pointer">
                    <div className="flex justify-between">
                        <div className="flex gap-4 text-lg">
                            <div className="">Test de HTML du</div>
                            <div className="text-gray-800 font-bold">
                                2025-12-12
                            </div>
                        </div>
                        <div className="font-bold text-gray-800">M1</div>
                    </div>
                </div>
                <div className="shadow p-4 bg-white my-2 cursor-pointer">
                    <div className="flex justify-between">
                        <div className="flex gap-4 text-lg">
                            <div className="">Test de HTML du</div>
                            <div className="text-gray-800 font-bold">
                                2025-12-12
                            </div>
                        </div>
                        <div className="font-bold text-gray-800">M1</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AdminHistory;