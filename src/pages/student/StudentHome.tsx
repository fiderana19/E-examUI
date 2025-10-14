import StudentNavigation from "@/components/Navigation/StudentNavigation";
import Typewriter from "@/components/TypeWritter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentHome: React.FC  = () => {
    const navigate = useNavigate();

    return <div className="pt-20 pb-10 px-[12%] min-h-screen flex flex-col justify-center">
        <StudentNavigation />
        <div className="flex justify-between items-center">
            <div className="w-1/2">
                <div className="text-3xl font-bold">
                    <Typewriter text="Bienvenue sur E-exam, Antsa Fiderana !" />
                </div>
                <div className="my-4">La plateforme dedié aux examens en ligne, vous pouvez voir vos resultats d'examens ici.</div>
                <Button onClick={() => navigate("/student/announce")}>Voir les annonces</Button>
            </div>
            <Card className="w-1/3 px-4">
                <div className="text-gray-800 font-medium">Les dernieres annonces</div>
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
}

export default StudentHome;