import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import ClokcTest from "@/components/Test/ClockTest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useGetAllTestByTeacherId } from "@/hooks/test/useGetAllTestByTeacherId";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { usePutTestToFinishStatus } from "@/hooks/test/usePutTestToFinishStatus";
import { Clock, Loader2, Timer, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherTestLaunchedView: React.FC = () => {
  const req = useParams();
  const Id = req.id ? req.id : "";
  const { token } = useAuth();
  const [testId, setTestId] = useState<string>("");
  const { data: test, refetch, isLoading } = useGetTestById(Id ? Number(Id) : 0);
  const { refetch: refetchTests } = useGetAllTestByTeacherId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const { mutateAsync: finish, isPending: finishLoading } = usePutTestToFinishStatus({
    action() {
      refetch();
      refetchTests();
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (Id) setTestId(Id);
  }, [Id]);

  const finishTest = async () => {
    const reponse = await finish(testId);
    if (reponse.status === HttpStatus.OK || reponse.status === HttpStatus.CREATED) {
      navigate("/teacher/test");
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-3xl mx-auto">
        <Button
          onClick={() => navigate("/teacher/test")}
          variant="outline"
          size="sm"
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Retour
        </Button>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : test ? (
          <>
            <Card className="border-border overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-white" />
                    <h1 className="text-lg font-semibold text-white">{test.titre ?? ""}</h1>
                  </div>
                  <StatusBadge status={test.status} />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Durée: {test.duree_minutes ?? "?"} min</span>
                  </div>
                  <div className="text-muted-foreground">{test?.nom_groupe ?? ""}</div>
                </div>
                <p className="text-sm text-muted-foreground">{test.description ?? ""}</p>
              </div>
            </Card>

            <Card className="border-border">
              <div className="p-8 flex flex-col items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Temps restant (secondes)</p>
                  <div className="text-4xl font-mono font-bold text-primary-custom">
                    <ClokcTest afterTimeOver={finishTest} />
                  </div>
                </div>

                {finishLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Fermeture du test...
                  </div>
                )}

                <Button onClick={finishTest} disabled={finishLoading} size="lg">
                  {finishLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Terminer le test
                </Button>
              </div>
            </Card>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TeacherTestLaunchedView;
