import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Input } from "@/components/ui/input";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const StudentAnnonce: React.FC  = () => {

    return <div className="pt-20 pb-10 px-[12%] min-h-screen">
        <StudentNavigation />
        <div>
            <div className="flex justify-between">
                <div className="text-gray-800 text-3xl font-medium mb-10">Les annonces</div>
                <Input className="w-60" placeholder="Fitrer..." />
            </div>
            <div className="w-max mx-auto text-center text-gray-600">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Aucune annonce pour l'instant.</div>
            </div>
            <div className="">
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
                <div className="mb-2">
                    <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                    <blockquote className="border-l-2 pl-6 italic">
                        Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                        Bonne chance !
                    </blockquote>
                    <div className="text-right font-medium">Mr Andry</div>
                </div>
            </div>
        </div>
    </div>
}

export default StudentAnnonce;