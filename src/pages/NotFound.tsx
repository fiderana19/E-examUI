import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="text-3xl font-bold text-center my-4">E-Exam</div>
        <Card className="px-4 py-10">
          <div>
            <div className="font-extrabold text-3xl text-center">Page introuvable !</div>
            <div className="text-gray-600 text-center my-4">La page que vous essayez d'acceder est introvable.</div>
            <div className="flex justify-center w-full">
                <Button variant={"link"} onClick={() => navigate(-1)} className="w-max">
                  Retour
                </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
