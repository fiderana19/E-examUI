import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mock_tests } from "@/constants/mock";
import { useAuth } from "@/context/AuthContext";
import { useGetAllTestForCorrectionByTeacherId } from "@/hooks/test/useGetAllTestForCorrectionByTeacherId";
import { CloseOutlined, HourglassOutlined } from "@ant-design/icons";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherCorrection: React.FC = () => {
  const navigate = useNavigate();
  const [searchRef, setSearchRef] = useState<string>("");
  const { token } = useAuth();
  const { data: tests } = useGetAllTestForCorrectionByTeacherId(
    token ? Number(token.split("/")[0]) : 0,
  );

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center mb-10">
          <div className="text-gray-800 text-xl font-bold flex items-center gap-2">
            <Edit /> Vos corrections à faire
          </div>
          <Input
            className="w-48"
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder="Titre du test..."
          />
        </div>
        <div className="w-max mx-auto text-center text-gray-600 my-10 hidden">
          <CloseOutlined className="text-7xl" />
          <div className="mt-4 text-xl">
            Vous avez aucune correction à faire
          </div>
        </div>
        <div className="">
          {mock_tests.map((test: any, index: any) => {
            if (searchRef && !test.titre.includes(searchRef)) {
              return null;
            }
            return (
              <div key={index} className="shadow px-4 py-2 bg-white my-2">
                <div className="flex justify-between">
                  <div className="flex gap-4 text-lg">
                    <div className=""> {test.titre} du </div>
                    <div className="text-gray-800 font-bold">
                      {test.date_declenchement}
                    </div>
                    <div className="flex">
                      {test.status === "Terminé" ? (
                        <div className="text-xs border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                          <HourglassOutlined /> <div>Terminé</div>
                        </div>
                      ) : test.status === "En cours" ? (
                        <div className="text-xs border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                          <HourglassOutlined /> <div>En cours</div>
                        </div>
                      ) : (
                        <div className="text-xs border rounded-full px-1 bg-yellow-200 text-white flex items-center gap-2">
                          <HourglassOutlined /> <div>En attente</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-gray-800">
                    {" "}
                    {test.id_groupe}{" "}
                  </div>
                </div>
                <div className="flex justify-between my-1">
                  <div className="font-bold text-gray-800">
                    Feuille(s) à corriger : {test.note_max}{" "}
                  </div>
                  <Button
                    onClick={() =>
                      navigate(`/teacher/correction/view/${test.id_test}`)
                    }
                    variant={"secondary"}
                  >
                    <Edit /> Corriger
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherCorrection;
