import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { useGetReponseByTestId } from "@/hooks/reponse/useGetReponseByTestId";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { HourglassOutlined, LoadingOutlined } from "@ant-design/icons";
import { ChevronLeft, Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherCorrectionView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const { data: test, isLoading: testLoading } = useGetTestById(Id ? Number(Id) : 0);
  const { data: reponses, refetch, isLoading: reponseLoading } = useGetReponseByTestId(
    Id ? Number(Id) : 0,
  );

  useEffect(() => {
    refetch();
    if (reponses && reponses.length < 1) {
      navigate("/teacher/correction");
    }
  }, [reponses]);

  useEffect(() => {
    refetch();
    if (reponses && reponses.length < 1) {
      navigate("/teacher/correction");
    }
  }, []);

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-800 text-xl font-bold flex items-center gap-2">
            <Button
              onClick={() => navigate("/teacher/correction")}
              variant={"secondary"}
            >
              <ChevronLeft />
            </Button>
            Correction d'un test
          </div>
        </div>
        <div className="">
          {
            testLoading && <div className="text-5xl flex justify-center">
              <LoadingOutlined />
            </div>
          }
          {test && (
            <div className="shadow px-4 py-2 bg-white my-2">
              <div className="flex justify-between">
                <div className="flex gap-4 text-lg">
                  <div className=""> {test.titre} du</div>
                  <div className="text-gray-800 font-bold">
                    {test.date_declechement}
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
                  {test.nom_groupe}{" "}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {
            reponseLoading && <div className="text-5xl flex justify-center">
              <LoadingOutlined />
            </div>
          }
          {reponses &&
            reponses.map((reponse: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    navigate(
                      `/teacher/correction/action/${reponse.tentative.id_test}/${reponse.id_reponse}`,
                    )
                  }
                  className="mb-2 px-4 py-2 cursor-pointer border rounded"
                >
                  <div>
                    <div className="flex justify-end">
                      <div className="my-1 font-semibold">
                        Note maximum : {reponse.question.points}
                      </div>
                    </div>
                    <div className="font-semibold">
                      Question : {reponse.question.texte_question}{" "}
                    </div>
                    <div className="text-gray-700">
                      Reponse de l'étudiant : {reponse.reponse_texte}{" "}
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

export default TeacherCorrectionView;
