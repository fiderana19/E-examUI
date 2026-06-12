import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useTest } from "@/context/TestContext";
import { usePostTentative } from "@/hooks/tentative/usePostTentative";
import { useGetActiveTestBYGroupId } from "@/hooks/test/useGetActiveTestBYGroupId";
import { TentativeCreateInterface } from "@/interfaces/tentative.interface";
import { Clock, GraduationCap, Loader2, Timer, XCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentTest: React.FC = () => {
  const { updateSecondsLeft, updateIsFinished } = useTest();
  const { token } = useAuth();
  const { data: tests, refetch, isLoading } = useGetActiveTestBYGroupId(
    token ? JSON.parse(atob(token.split(".")[1])).id_groupe : 0,
  );
  const navigate = useNavigate();
  const { mutateAsync: creerTentative } = usePostTentative({ action() {} });

  useEffect(() => { refetch(); }, []);

  const debutTest = async (test: any) => {
    const data: TentativeCreateInterface = { id_test: test.id_test };
    const response = await creerTentative(data);
    if (response.status === HttpStatus.CREATED) {
      updateIsFinished(false);
      const min = Number(test.duree_minutes) * 60;
      updateSecondsLeft(min);
      navigate(`/student/test/room/${test.id_test}/${response.data.id_tentative}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <StudentNavigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Mes tests</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Les examens disponibles pour votre groupe
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : !tests?.data?.length ? (
          <div className="text-center py-20">
            <GraduationCap className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Aucun test disponible</h3>
            <p className="text-sm text-muted-foreground/60 mt-1">Les tests apparaîtront ici quand ils seront publiés</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.data.map((test: any, index: any) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 card-hover">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold">{test.titre ?? ""}</h2>
                      <div className="flex items-center gap-1.5 text-xs bg-primary-custom/10 text-primary-custom px-2.5 py-1 rounded-full font-medium">
                        <Timer className="w-3.5 h-3.5" />
                        {test.duree_minutes ?? "?"} min
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{test.description ?? ""}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium">{test.nom_groupe ?? ""}</p>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={() => debutTest(test)} size="lg">
                    <Clock className="w-4 h-4" /> Faire le test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTest;
