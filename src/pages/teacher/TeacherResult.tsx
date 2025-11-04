import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Input } from "@/components/ui/input";
import { useGetAllCorrectedTestByTeacherId } from "@/hooks/test/useGetAllCorrectedTestByTeacherId";
import { CloseOutlined } from "@ant-design/icons";
import { BookText } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherResult: React.FC = () => {
  const { data: results } = useGetAllCorrectedTestByTeacherId();
  const navigate = useNavigate();
  const [searchRef, setSearchRef] = useState<string>("");

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-800 text-xl font-bold flex items-center gap-2">
            <BookText /> Les tests corrigés
          </div>
          <Input
            className="w-48"
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder="Titre du test..."
          />
        </div>
        {results && results.length < 1 && (
          <div className="w-max mx-auto text-center text-gray-600 my-10 hidden">
            <CloseOutlined className="text-7xl" />
            <div className="mt-4 text-xl">Vous avez aucune resultat</div>
          </div>
        )}
        <div className="">
          {results && results.map((test: any, index: any) => {
            if (searchRef && !test.titre.includes(searchRef)) {
              return null;
            }
            return (
              <div
                key={index}
                onClick={() => navigate(`/teacher/result/view/${test.id_test}`)}
                className="shadow p-4 bg-white my-2 cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className="flex gap-4 text-lg">
                    <div className=""> {test.titre} du</div>
                    <div className="text-gray-800 font-bold">
                      {test.date_declechement}
                    </div>
                  </div>
                  <div className="font-bold text-gray-800">
                    {" "}
                    {test.group.nom_groupe}{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherResult;
