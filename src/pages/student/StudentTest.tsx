import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useTest } from "@/context/TestContext";
import { usePostTentative } from "@/hooks/tentative/usePostTentative";
import { useGetActiveTestBYGroupId } from "@/hooks/test/useGetActiveTestBYGroupId";
import { TentativeCreateInterface } from "@/interfaces/tentative.interface";
import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentTest: React.FC = () => {
  const { updateSecondsLeft, updateIsFinished } = useTest();
  const { token } = useAuth();
  const { data: tests, refetch } = useGetActiveTestBYGroupId(
    token ? JSON.parse(atob(token.split(".")[1])).id_groupe : 0,
  );  
  const navigate = useNavigate();
  const { mutateAsync: creerTentative } = usePostTentative({action() {
    
  },})

  useEffect(() => {
    refetch()
  }, [])

  const debutTest = async (test: any) => {
    const data: TentativeCreateInterface = { id_test : test.id_test};
    const response = await creerTentative(data);
    if(response.status === HttpStatus.CREATED) {
      updateIsFinished(false);
      const min = Number(test.duree_minutes) * 60;
      updateSecondsLeft(min);
      navigate(`/student/test/room/${test.id_test}/${response.data.id_tentative}`);
    }
  };

  return (
    <div className="pt-20 pb-10 px-[12%] min-h-screen">
      <StudentNavigation />
      <div>
        <div className="text-gray-800 text-xl font-bold mb-10">Les tests</div>
        {
          tests && tests.length < 1 && <div className="w-max mx-auto text-center text-gray-600">
            <CloseOutlined className="text-7xl" />
            <div className="mt-4 text-xl">Aucun test disponible.</div>
          </div>
        }
        <div className="">
          {tests && tests.slice(0, 1).map((test: any, index: any) => {
            return (
              <div key={index} className="shadow p-4 bg-white">
                <div className="mb-4">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="font-bold text-lg"> {test.titre} </div>
                      <div className="border rounded-full px-2 bg-gray-400 text-white">
                        <ClockCircleOutlined /> {test.duree_minutes}:00
                      </div>
                    </div>
                    <div className="font-bold text-gray-800">
                      {" "}
                      {test.nom_groupe}{" "}
                    </div>
                  </div>
                  <div className="text-gray-700"> {test.description} </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => debutTest(test)}>Faire le test</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentTest;
