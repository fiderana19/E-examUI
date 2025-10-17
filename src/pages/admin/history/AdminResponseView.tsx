import AdminNavigation from "@/components/Navigation/AdminNavigation";
import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import { BookText } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminResponseView: React.FC  = () => {
    const navigate = useNavigate();

    return <div className="pl-64 pr-6">
        <AdminNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center">
                <div className="text-gray-800 text-3xl font-medium mb-4 flex items-center gap-2"> Reponse d'un étudiant</div>
            </div>
            <div className="">
                <div className="shadow px-4 py-2 bg-white my-2">
                    <div className="flex justify-between">
                        <div className="flex gap-4 text-lg">
                            <div className="">Test de HTML du</div>
                            <div className="text-gray-800 font-bold">
                                2025-12-12
                            </div>
                        </div>
                        <div className="font-bold text-gray-800">M1</div>
                    </div>
                    <div>Etudiant : rakoto</div>
                    <div>Matricule : 1023</div>
                    <div>Note : 20</div>
                    <div>Heure de soumission: 15:50</div>
                </div>
            </div>
            <div>
                <div className="mb-2 px-4 py-2 border rounded">
                    <div>
                        <div className="flex justify-between">
                            <div className="text-gray-600">Type: DEV</div>
                            <div className="my-1 font-semibold">Note attribué : 3</div>
                        </div>
                        <div className="font-semibold">Question : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque alias, tempora modi exercitationem voluptas eaque</div>
                        <div className="text-gray-700">Reponse de l'étudiant : Lorem ipsum, dolor sit amet consectetur</div>
                    </div>
                </div>
                <div className="mb-2 px-4 py-2 border rounded">
                    <div>
                        <div className="flex justify-between">
                            <div className="text-gray-600">Type: DEV</div>
                            <div className="my-1 font-semibold">Note attribué : 3</div>
                        </div>
                        <div className="font-semibold">Question : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque alias, tempora modi exercitationem voluptas eaque</div>
                        <div className="text-gray-700">Reponse de l'étudiant : Lorem ipsum, dolor sit amet consectetur</div>
                    </div>
                </div>
                <div className="mb-2 px-4 py-2 border rounded">
                    <div>
                        <div className="flex justify-between">
                            <div className="text-gray-600">Type: DEV</div>
                            <div className="my-1 font-semibold">Note attribué : 3</div>
                        </div>
                        <div className="font-semibold">Question : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque alias, tempora modi exercitationem voluptas eaque</div>
                        <div className="text-gray-700">Reponse de l'étudiant : Lorem ipsum, dolor sit amet consectetur</div>
                    </div>
                </div>
                <div className="mb-2 px-4 py-2 border rounded">
                    <div>
                        <div className="flex justify-between">
                            <div className="text-gray-600">Type: DEV</div>
                            <div className="my-1 font-semibold">Note attribué : 3</div>
                        </div>
                        <div className="font-semibold">Question : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque alias, tempora modi exercitationem voluptas eaque</div>
                        <div className="text-gray-700">Reponse de l'étudiant : Lorem ipsum, dolor sit amet consectetur</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AdminResponseView;