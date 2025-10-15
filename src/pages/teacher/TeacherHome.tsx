import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Card } from "@/components/ui/card";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const TeacherHome: React.FC  = () => {

    return <div className="pl-64 pr-[4%] min-h-screen flex flex-col justify-center">
        <TeacherNavigation />
        <div>
        <div className="flex justify-between items-center">
            <div className="w-1/2">
                <div className="text-3xl uppercase font-bold">
                    Bienvenue sur l'espace pour les profs !
                </div>
                <div className="text-xl text-gray-600 mt-3">
                    Cet espace vous permet d'organiser un examen en ligne pour vos matières.
                </div>
            </div>
            <Card className="w-1/3 px-4">
                <div className="text-gray-800 font-medium">Vos dernieres annonces</div>
                <div className="my-10 w-max mx-auto text-center text-gray-600 hidden">
                    <CloseOutlined className="text-5xl" />
                    <div className="mt-4">Vous avez fait aucune annonce !</div>
                </div>
                <div className="">
                    <div className="mb-1">
                        <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                        <blockquote className="border-l-2 pl-6 italic">
                            Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                            Bonne chance !
                        </blockquote>
                        <div className="text-right font-medium">Mr Andry</div>
                    </div>
                    <div className="mb-1">
                        <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                        <blockquote className="border-l-2 pl-6 italic">
                            Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                            Bonne chance !
                        </blockquote>
                        <div className="text-right font-medium">Mr Andry</div>
                    </div>
                    <div className="mb-1">
                        <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                        <blockquote className="border-l-2 pl-6 italic">
                            Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                            Bonne chance !
                        </blockquote>
                        <div className="text-right font-medium">Mr Andry</div>
                    </div>
                </div>
            </Card>
        </div>
        </div>
    </div>
}

export default TeacherHome;