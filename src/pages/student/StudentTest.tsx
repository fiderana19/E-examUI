import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { mock_tests } from "@/constants/mock";
import { useTest } from "@/context/TestContext";
import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentTest: React.FC = () => {
  const { updateIsInTest, updateSecondsLeft, updateIsFinished } = useTest();
  const initial = 60 * 60;
  const navigate = useNavigate();

  const debutTest = () => {
    updateIsFinished(false);
    updateIsInTest(true);
    updateSecondsLeft(initial);
    navigate("/student/test/room/225");
  };

  return (
    <div className="pt-20 pb-10 px-[12%] min-h-screen">
      <StudentNavigation />
      <div>
        <div className="text-gray-800 text-xl font-bold mb-10">Les tests</div>
        <div className="w-max mx-auto text-center text-gray-600">
          <CloseOutlined className="text-7xl" />
          <div className="mt-4 text-xl">Aucun test disponible.</div>
        </div>
        <div className="">
          {mock_tests.slice(0, 1).map((test: any, index: any) => {
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
                      {test.id_utilisateur}{" "}
                    </div>
                  </div>
                  <div className="text-gray-700"> {test.description} </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => debutTest()}>Faire le test</Button>
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
