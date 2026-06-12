import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { useGetReponseByTestId } from "@/hooks/reponse/useGetReponseByTestId";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { Loader2, ChevronLeft, HelpCircle, Clock } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/dateFixation";

const TeacherCorrectionView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const { data: test, isLoading: testLoading } = useGetTestById(Id ? Number(Id) : 0);
  const { data: reponses, refetch, isLoading: reponseLoading } = useGetReponseByTestId(Id ? Number(Id) : 0);

  useEffect(() => { refetch(); }, []);

  useEffect(() => {
    if (reponses && reponses.length < 1) navigate("/teacher/correction");
  }, [reponses]);

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-4xl mx-auto">
        <Button onClick={() => navigate("/teacher/correction")} variant="outline" size="sm" className="mb-6">
          <ChevronLeft className="w-4 h-4" /> Retour
        </Button>

        {testLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : test ? (
          <Card className="border-border overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-white" />
                  <h1 className="text-lg font-semibold text-white">Correction: {test.titre ?? ""}</h1>
                </div>
                <StatusBadge status={test.status} />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(test.date_declechement)}</span>
                </div>
                <span className="font-medium">{test?.nom_groupe ?? ""}</span>
              </div>
            </div>
          </Card>
        ) : null}

        <h2 className="text-xl font-bold tracking-tight mb-6">Réponses des étudiants</h2>

        {reponseLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : reponses?.length > 0 ? (
          <div className="space-y-3">
            {reponses.map((reponse: any, index: number) => (
              <div
                key={index}
                onClick={() =>
                  reponse?.tentative?.id_test && reponse?.id_reponse &&
                  navigate(`/teacher/correction/action/${reponse.tentative.id_test}/${reponse.id_reponse}`)
                }
                className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="bg-muted px-2 py-0.5 rounded font-medium">
                        {reponse?.question?.type_question ?? ""}
                      </span>
                      <span className="font-medium text-primary-custom">
                        Note max: {reponse?.question?.points ?? "?"}
                      </span>
                    </div>
                    <p className="font-medium mb-1">{reponse?.question?.texte_question ?? ""}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      <span className="font-medium">Réponse: </span>
                      {reponse?.reponse_texte ?? ""}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Button size="sm" variant="outline">
                      Noter
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <HelpCircle className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">Aucune réponse</h3>
            <p className="text-sm text-muted-foreground/60">
              Les réponses des étudiants apparaîtront ici
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCorrectionView;
