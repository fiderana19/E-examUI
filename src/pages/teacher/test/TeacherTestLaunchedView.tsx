import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import ClokcTest from "@/components/Test/ClockTest";
import { Card } from "@/components/ui/card";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useGetAllTestByTeacherId } from "@/hooks/test/useGetAllTestByTeacherId";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { usePutTestToFinishStatus } from "@/hooks/test/usePutTestToFinishStatus";
import { ClockCircleOutlined, HourglassOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherTestLaunchedView: React.FC = () => {
  const req = useParams();
  const Id = req.id ? req.id : "";
  const { token } = useAuth();
  const [testId, setTestId] = useState<string>("");
  const { data: test, refetch } = useGetTestById(Id ? Number(Id) : 0);
  const { refetch: refetchTests } = useGetAllTestByTeacherId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const { mutateAsync: finish } = usePutTestToFinishStatus({
    action() {
      refetch();
      refetchTests();
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (Id) {
      setTestId(Id);
    }
  }, [Id]);

  const finishTest = async () => {
    const reponse = await finish(testId);
    if (
      reponse.status === HttpStatus.OK ||
      reponse.status === HttpStatus.CREATED
    ) {
      navigate("/teacher/test");
    }
  };

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
            <div className="text-gray-700" onClick={() => finishTest()}>
              {" "}
              {test.description}{" "}
            </div>
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
