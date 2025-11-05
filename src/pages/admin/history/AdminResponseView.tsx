import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Button } from "@/components/ui/button";
import { useGetTentativeResponseByTestId } from "@/hooks/tentative/useGetTentativeResponseByTestId";
import { LoadingOutlined } from "@ant-design/icons";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminResponseView: React.FC = () => {
  const req = useParams();
  const TentativeId = req.id;
  const { data: result, isLoading } = useGetTentativeResponseByTestId(
    TentativeId ? Number(TentativeId) : 0,
  );
  const navigate = useNavigate();

  return (
    <div className="pl-64 pr-6">
      <AdminNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-800 text-xl font-bold mb-4 flex items-center gap-2">
            <Button onClick={() => navigate(-1)} variant={"secondary"}>
              <ChevronLeft />
            </Button>
            Reponse d'un étudiant
          </div>
        </div>
        {
          isLoading && <div className="text-5xl flex justify-center">
            <LoadingOutlined />
          </div>
        }
        {result && (
          <div className="">
            <div className="shadow px-4 py-2 bg-white my-2">
              <div className="flex justify-between">
                <div className="flex gap-4 text-lg">
                  <div className="">Test de {result?.test.titre} du</div>
                  <div className="text-gray-800 font-bold">
                    {result?.test.date_declechement}
                  </div>
                </div>
                <div className="font-bold text-gray-800">
                  {result?.test.group.nom_groupe}
                </div>
              </div>
              <div>Etudiant : {result?.utilisateur.nom}</div>
              <div>Matricule : {result?.utilisateur.matricule}</div>
              <div>
                Note : {result?.note_obtenue < 10 && "0"}
                {result?.note_obtenue}/20
              </div>
              <div>Heure de soumission: {result?.heure_soumission}</div>
            </div>
          </div>
        )}
        {result && (
          <div>
            {result?.reponses.map((reponse: any, index: number) => {
              return (
                <div key={index} className="mb-2 px-4 py-2 border rounded">
                  <div>
                    <div className="flex justify-between">
                      <div className="text-gray-600 uppercase">
                        Type: {reponse?.question.type_question}
                      </div>
                      <div className="my-1 font-semibold">
                        Note attribué : {reponse?.score_question}
                      </div>
                    </div>
                    <div className="font-semibold">
                      Question : {reponse?.question.texte_question}
                    </div>
                    <div className="text-gray-700">
                      Reponse de l'étudiant : {reponse?.reponse_texte}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResponseView;
