import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mock_utilisateurs } from "@/constants/mock";
import { UserOutlined } from "@ant-design/icons";
import { LogOut } from "lucide-react";
import React from "react";

const TeacherProfile: React.FC  = () => {

    return <div className="pl-64 pr-[4%] my-6">
        <TeacherNavigation />
        <div>
            <div className="text-gray-800 text-xl font-bold mb-4">Profile</div>
            {
                mock_utilisateurs && 
                <Card className="px-4 py-10 w-1/3 mx-auto">
                    <div className="p-4 border w-max rounded-full mx-auto"><UserOutlined className="text-6xl" /></div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div>Nom :</div>
                            <div className="font-bold"> { mock_utilisateurs[0].nom } </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>Adresse mail :</div>
                            <div className="font-bold">{ mock_utilisateurs[0].email }</div>
                        </div>
                    </div>
                </Card>
            }
            <div className="flex justify-center mt-4">
                <Button className="w-max"><LogOut /> Se deconnecter</Button>
            </div>
        </div>
    </div>
}

export default TeacherProfile;