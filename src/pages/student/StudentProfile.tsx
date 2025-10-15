import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserOutlined } from "@ant-design/icons";
import { LogOut } from "lucide-react";
import React from "react";

const StudentProfile: React.FC  = () => {

    return <div className="pt-20 pb-10 px-[12%] min-h-screen">
        <StudentNavigation />
        <div>
            <div className="text-gray-800 text-3xl font-medium mb-4">Profile</div>
            <Card className="px-4 py-10 w-1/3 mx-auto">
                <div className="p-4 border w-max rounded-full mx-auto"><UserOutlined className="text-6xl" /></div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div>Nom :</div>
                        <div className="font-bold">ANTSA FIDERANA</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>Matricule :</div>
                        <div className="font-bold">1111J-F</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>Année universitaire :</div>
                        <div className="font-bold">2024-2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>Matricule :</div>
                        <div className="font-bold">1111J-F</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>Adresse mail :</div>
                        <div className="font-bold">antsafider@gmail.com</div>
                    </div>
                </div>
            </Card>
            <div className="flex justify-center mt-4">
                <Button className="w-max"><LogOut /> Se deconnecter</Button>
            </div>
        </div>
    </div>
}

export default StudentProfile;