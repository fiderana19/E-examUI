import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { mock_reponseetudiants_a_corriger, mock_tests } from "@/constants/mock";
import { HourglassOutlined } from "@ant-design/icons";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherCorrectionView: React.FC  = () => {
    const navigate = useNavigate();
    const test = mock_tests[0];

    return <div className="pl-64 pr-6">
        <TeacherNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-800 text-xl font-bold flex items-center gap-2"><Edit /> Correction d'un test</div>
            </div>
            <div className="">
                {
                    test &&
                    <div className="shadow px-4 py-2 bg-white my-2">
                        <div className="flex justify-between">
                            <div className="flex gap-4 text-lg">
                                <div className=""> { test.titre }  du</div>
                                <div className="text-gray-800 font-bold">
                                    { test.date_declenchement }
                                </div>
                                <div className="flex">
                                    {
                                        (test.status === "Terminé") ?
                                        <div className="text-xs border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                                            <HourglassOutlined /> <div>Terminé</div>
                                        </div>
                                        :
                                        ((test.status === "En cours") ?
                                        <div className="text-xs border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                                            <HourglassOutlined /> <div>En cours</div>
                                        </div>
                                        :
                                        <div className="text-xs border rounded-full px-1 bg-yellow-200 text-white flex items-center gap-2">
                                            <HourglassOutlined /> <div>En attente</div>
                                        </div>                                        
                                    )
                                    }
                                </div>
                            </div>
                            <div className="font-bold text-gray-800"> { test.id_groupe } </div>
                        </div>
                    </div>
                }
            </div>
            <div>
                {
                    mock_reponseetudiants_a_corriger.map((reponse: any, index: any) => {
                        return <div key={index} onClick={() => navigate("/teacher/correction/action")} className="mb-2 px-4 py-2 cursor-pointer border rounded">
                            <div>
                                <div className="flex justify-end">
                                    <div className="my-1 font-semibold">Note maximum : { reponse.id_tentative } point(s)</div>
                                </div>
                                <div className="font-semibold">Question : { reponse.id_question } </div>
                                <div className="text-gray-700">Reponse de l'étudiant : { reponse.reponse_texte } </div>
                            </div>
                        </div>
                    })
                }
                
            </div>
        </div>
    </div>
}

export default TeacherCorrectionView;