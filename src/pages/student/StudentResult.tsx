import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { ClockCircleOutlined, CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import React from "react";

const StudentResult: React.FC  = () => {

    return <div className="pt-20 pb-10 px-[12%] min-h-screen">
        <StudentNavigation />
        <div>
            <div className="text-gray-800 text-3xl font-medium mb-10">Resultats</div>
            <div className="w-max mx-auto text-center text-gray-600">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Aucun resultat disponible.</div>
            </div>
            <div className="">
                <div className="shadow p-4 bg-white">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <div className="font-bold text-lg">Test de HTML du </div>
                                <div className="text-gray-600 font-bold text-lg">
                                    2025-10-25 15:00
                                </div>
                            </div>
                            <div className="font-bold text-gray-800">Mr Andry</div>
                        </div>
                        <div className="flex gap-2 my-1">
                                <div className="border rounded-full px-2 bg-gray-400 text-white">
                                    <ClockCircleOutlined /> 45:00
                                </div>
                            <div>
                                Heure de soumission : 2025-10-25 15:45
                            </div>
                        </div>                        
                        <div className="text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, expedita quidem non sint esse perferendis ex exercitationem molestias cum</div>
                        <div className="flex justify-end">
                            <div>Note: 19/20</div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button><FilePdfOutlined /> Generer un relevé</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default StudentResult;