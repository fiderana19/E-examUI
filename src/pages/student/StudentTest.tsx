import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentTest: React.FC  = () => {
    const navigate = useNavigate();

    return <div className="pt-20 pb-10 px-[12%] min-h-screen">
        <StudentNavigation />
        <div>
            <div className="text-gray-800 text-3xl font-medium mb-10">Test</div>
            <div className="w-max mx-auto text-center text-gray-600">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Aucun test disponible.</div>
            </div>
            <div className="">
                <div className="shadow p-4 bg-white">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg">Test de HTML</div>
                                <div className="border rounded-full px-2 bg-gray-400 text-white">
                                    <ClockCircleOutlined /> 45:00
                                </div>
                            </div>
                            <div className="font-bold text-gray-800">Mr Andry</div>
                        </div>
                        <div className="text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, expedita quidem non sint esse perferendis ex exercitationem molestias cum</div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => navigate("/student/test/room")} >Faire le test</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default StudentTest;