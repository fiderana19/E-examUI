import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useGetAnnonceByUserId } from "@/hooks/annonce/useGetAnnonceByUserId";
import { CloseOutlined, NotificationTwoTone } from "@ant-design/icons";
import React from "react";

const TeacherHome: React.FC = () => {
  const { token } = useAuth();
  const { data: annonces } = useGetAnnonceByUserId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );

  return (
    <div className="pl-64 pr-[4%] min-h-screen flex flex-col justify-center">
      <TeacherNavigation />
      <div>
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <div className="text-3xl uppercase font-bold">
              Bienvenue sur l'espace pour les profs !
            </div>
            <div className="text-xl text-gray-600 mt-3">
              Cet espace vous permet d'organiser un examen en ligne pour vos
              matières.
            </div>
          </div>
          <Card className="w-1/3 px-4">
            <div>
              <div className="text-gray-800 font-medium">
                Vos dernieres annonces
              </div>
              <div className="my-10 w-max mx-auto text-center text-gray-600 hidden">
                <CloseOutlined className="text-5xl" />
                <div className="mt-4">Vous avez fait aucune annonce !</div>
              </div>
              <div className="">
                {annonces && annonces.slice(0, 3).map((announce: any, index: any) => {
                  return (
                    <div key={index} className="my-2">
                      <div className="text-xs text-gray-600 mb-1">
                        {" "}
                        {announce.creation_annonce}{" "}
                      </div>
                      <blockquote className="border-l-2 pl-6 italic">
                        <NotificationTwoTone /> {announce.titre_annonce} <br />
                        {announce.texte_annonce}
                      </blockquote>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
