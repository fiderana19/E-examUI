import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Input } from "@/components/ui/input";
import { mock_annonces } from "@/constants/mock";
import { CloseOutlined, NotificationTwoTone } from "@ant-design/icons";
import React, { useState } from "react";

const StudentAnnonce: React.FC  = () => {
    const [searchRef, setSearchRef] = useState<string>('');

    return <div className="pt-20 pb-10 px-[12%] min-h-screen">
        <StudentNavigation />
        <div>
            <div className="flex justify-between">
                <div className="text-gray-800 text-xl font-bold mb-10">Les annonces</div>
                <Input className="w-60" onChange={(e) => setSearchRef(e.target.value)} placeholder="Mot clés de l'annonce..." />
            </div>
            <div className="w-max mx-auto text-center text-gray-600">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Aucune annonce pour l'instant.</div>
            </div>
            <div className="">
                {
                    mock_annonces.map((announce: any, index: any) => {
                        if (searchRef && !announce.texte_annonce.includes(searchRef)) {
                            return null;
                        }
                        return <div key={index} className="mb-2">
                            <div className="text-xs text-gray-600 mb-1"> { announce.creation_annonce } </div>
                            <blockquote className="border-l-2 pl-6 italic">
                                <NotificationTwoTone /> { announce.titre_annonce } <br />
                                { announce.texte_annonce }
                            </blockquote>
                            <div className="text-right font-medium"> { announce.id_utilisateur } </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default StudentAnnonce;