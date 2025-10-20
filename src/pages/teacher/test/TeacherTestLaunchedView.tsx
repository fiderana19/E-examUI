import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import ClokcTest from "@/components/Test/ClockTest";
import { Card } from "@/components/ui/card";
import { mock_tests } from "@/constants/mock";
import { ClockCircleOutlined, HourglassOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherTestLaunchedView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const test = mock_tests[0];

  const finishTest = () => {};

  return (
    <div className="pl-64 pt-4 pr-6">
      <TeacherNavigation />
      {test && (
        <div className="">
          <div className="">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="font-bold text-lg"> {test.titre} </div>
                <div className="border rounded-full px-2 bg-gray-400 text-white">
                  <ClockCircleOutlined /> {test.duree_minutes}:00
                </div>
              </div>
              <div className="font-bold text-gray-800"> {test.id_groupe} </div>
              {test.status === "Terminé" ? (
                <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                  <HourglassOutlined /> <div>Terminé</div>
                </div>
              ) : test.status === "En cours" ? (
                <div className="border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                  <HourglassOutlined /> <div>En cours</div>
                </div>
              ) : (
                <div className="border rounded-full px-2 bg-yellow-200 text-white flex items-center gap-2">
                  <HourglassOutlined /> <div>En attente</div>
                </div>
              )}
            </div>
            <div className="flex justify-between my-1">
              <div className="flex gap-4">
                <div className="font-bold text-lg text-gray-600">
                  15 questions max
                </div>
              </div>
              <div className="font-bold text-gray-800">Note maximum : 20 </div>
            </div>
            <div className="text-gray-700"> {test.description} </div>
          </div>
          <Card className="my-10 w-max mx-auto px-4">
            <div>
              <div>Temps restant(s) :</div>
              <div className="mx-auto w-max mt-2">
                <ClokcTest afterTimeOver={finishTest} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TeacherTestLaunchedView;
