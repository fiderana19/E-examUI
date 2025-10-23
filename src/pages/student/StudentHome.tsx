import StudentNavigation from "@/components/Navigation/StudentNavigation";
import Typewriter from "@/components/TypeWritter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useGetAnnonceByGroupId } from "@/hooks/annonce/useGetAnnonceByGroupId";
import { NotificationTwoTone } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { data: annonces } = useGetAnnonceByGroupId(
    token ? JSON.parse(atob(token.split(".")[1])).id_groupe : 0,
  );

  return (
    <div className="pt-20 pb-6 px-[12%] min-h-screen flex flex-col justify-center">
      <StudentNavigation />
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <div className="text-3xl font-bold">
            <Typewriter text="Bienvenue sur E-exam, Antsa Fiderana !" />
          </div>
          <div className="my-4">
            La plateforme dedié aux examens en ligne, vous pouvez voir vos
            resultats d'examens ici.
          </div>
          <Button onClick={() => navigate("/student/announce")}>
            Voir les annonces
          </Button>
        </div>
        <Card className="w-1/3 px-4">
          <div>
            <div className="text-gray-800 font-medium">
              Les dernieres annonces
            </div>
            <div className="">
              {annonces &&
                annonces.slice(0, 3).map((announce: any, index: any) => {
                  return (
                    <div key={index} className="mb-1">
                      <div className="text-xs text-gray-600 mb-1">
                        {" "}
                        {announce.creation_annonce}{" "}
                      </div>
                      <blockquote className="border-l-2 pl-6 italic text-justify">
                        <NotificationTwoTone /> {announce.titre_annonce} <br />
                        {announce.texte_annonce}
                      </blockquote>
                      <div className="text-right font-medium">
                        {" "}
                        {announce.id_utilisateur}{" "}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentHome;
