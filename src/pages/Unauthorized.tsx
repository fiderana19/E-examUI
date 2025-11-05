import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="text-3xl font-bold text-center my-4">E-Exam</div>
        <Card className="px-4 py-10">
          <div>
            <div className="font-extrabold text-3xl text-center">
              Page non autorisée !
            </div>
            <div className="text-gray-600 text-center my-4">
              Vous n'êtes pas autorisé pour la page que vous essayer d'acceder.
            </div>
            <div className="flex justify-center w-full">
              <Button
                variant={"link"}
                onClick={() => navigate(-3)}
                className="w-max"
              >
                Retour
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Unauthorized;
