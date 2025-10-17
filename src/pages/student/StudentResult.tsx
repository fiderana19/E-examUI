import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
            <div className="my-6">
                <Card className="px-4 my-1 cursor-pointer">
                    <div>
                        <div className="text-xs text-gray-600">Publié le 2025-12-12 08:00</div>
                        <div className="flex justify-between">
                            <div className="font-medium">M1 | vuefnbv</div>
                            <div className="text-gray-700 font-bold"><FilePdfOutlined className=" mr-2" />result.pdf</div>
                        </div>
                    </div>
                </Card>
                <Card className="px-4 my-1 cursor-pointer">
                    <div>
                        <div className="text-xs text-gray-600">Publié le 2025-12-12 08:00</div>
                        <div className="flex justify-between">
                            <div className="font-medium">M1 | vuefnbv</div>
                            <div className="text-gray-700 font-bold"><FilePdfOutlined className=" mr-2" />result.pdf</div>
                        </div>
                    </div>
                </Card>
                <Card className="px-4 my-1 cursor-pointer">
                    <div>
                        <div className="text-xs text-gray-600">Publié le 2025-12-12 08:00</div>
                        <div className="flex justify-between">
                            <div className="font-medium">M1 | vuefnbv</div>
                            <div className="text-gray-700 font-bold"><FilePdfOutlined className=" mr-2" />result.pdf</div>
                        </div>
                    </div>
                </Card>
                <Card className="px-4 my-1 cursor-pointer">
                    <div>
                        <div className="text-xs text-gray-600">Publié le 2025-12-12 08:00</div>
                        <div className="flex justify-between">
                            <div className="font-medium">M1 | vuefnbv</div>
                            <div className="text-gray-700 font-bold"><FilePdfOutlined className=" mr-2" />result.pdf</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
}

export default StudentResult;