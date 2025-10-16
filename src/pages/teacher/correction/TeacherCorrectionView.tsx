import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CloseOutlined, HourglassOutlined } from "@ant-design/icons";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherCorrectionView: React.FC  = () => {
    const navigate = useNavigate();

    return <div className="pl-64 pr-6">
        <TeacherNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center">
                <div className="text-gray-800 text-3xl font-medium mb-4 flex items-center gap-2"><Edit /> Correction d'un test</div>
            </div>
            <div className="">
                <div className="shadow px-4 py-2 bg-white my-2">
                    <div className="flex justify-between">
                        <div className="flex gap-4 text-lg">
                            <div className="">Test de HTML du</div>
                            <div className="text-gray-800 font-bold">
                                2025-12-12
                            </div>
                            <div className="flex">
                                <div className="text-xs border rounded-full px-1 bg-yellow-200 text-white flex items-center gap-2">
                                    <HourglassOutlined /> <div>En attente</div>
                                </div>
                                <div className="text-xs border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                                    <HourglassOutlined /> <div>En cours</div>
                                </div>
                                <div className="text-xs border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                                    <HourglassOutlined /> <div>Terminé</div>
                                </div>
                            </div>
                        </div>
                        <div className="font-bold text-gray-800">M1</div>
                    </div>
                </div>
            </div>
            <div>
                <div onClick={() => navigate("/teacher/correction/action")} className="mb-2 px-4 py-2 cursor-pointer border rounded">
                    <div>
                        <div className="flex justify-between">
                            <div className="text-gray-600">Type: DEV</div>
                            <div className="my-1 font-semibold">Note maximum : 3 point(s)</div>
                        </div>
                        <div className="font-semibold">Question : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque alias, tempora modi exercitationem voluptas eaque</div>
                        <div className="text-gray-700">Reponse de l'étudiant : Lorem ipsum, dolor sit amet consectetur</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default TeacherCorrectionView;