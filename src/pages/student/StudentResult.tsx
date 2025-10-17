import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Card } from "@/components/ui/card";
import { mock_resultats } from "@/constants/mock";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import React from "react";

const StudentResult: React.FC  = () => {

    return <div className="pt-20 pb-10 px-[12%] min-h-screen">
        <StudentNavigation />
        <div>
            <div className="text-gray-800 text-xl font-bold mb-10">Les resultats</div>
            <div className="w-max mx-auto text-center text-gray-600">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Aucun resultat disponible.</div>
            </div>
            <div className="my-6">
                {
                    mock_resultats.map((result: any, index: any) => {
                        return <Card key={index} className="px-4 my-1 cursor-pointer">
                            <div>
                                <div className="text-xs text-gray-600">Publié le { result.date_publication } </div>
                                <div className="flex justify-between">
                                    <div className="font-medium"> { result.titre_resultat } </div>
                                    <div className="text-gray-700 font-bold"><FilePdfOutlined className=" mr-2" /> { result.fichier_resultat } </div>
                                </div>
                            </div>
                        </Card>
                    })
                }
            </div>
        </div>
    </div>
}

export default StudentResult;