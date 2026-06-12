import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetTentativeResponseByTestId } from "@/hooks/tentative/useGetTentativeResponseByTestId";
import {
  Loader2,
  ChevronLeft,
  User,
  Hash,
  Clock,
  Award,
  HelpCircle,
  FileText,
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/dateFixation";

const AdminResponseView: React.FC = () => {
  const req = useParams();
  const TentativeId = req.id;
  const { data: result, isLoading } = useGetTentativeResponseByTestId(TentativeId ? Number(TentativeId) : 0);
  const navigate = useNavigate();

  const formatNote = (note: number | undefined | null): string => {
    if (note === undefined || note === null) return "---";
    const formatted = note < 10 ? `0${note}` : String(note);
    return `${formatted}/20`;
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <AdminNavigation />
      <div className="p-8 max-w-4xl mx-auto">
        <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="mb-6">
          <ChevronLeft className="w-4 h-4" /> Retour
        </Button>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : result ? (
          <>
            <Card className="border-border overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
                <div className="flex items-center gap-3 text-white">
                  <FileText className="w-5 h-5" />
                  <h1 className="text-lg font-semibold">Réponse d'un étudiant</h1>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Test</span>
                  <span className="font-medium">{result?.test?.titre ?? ""}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{formatDate(result?.test?.date_declechement)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Groupe</span>
                  <span className="font-medium">{result?.test?.group?.nom_groupe ?? ""}</span>
                </div>
                <div className="border-t border-border my-2" />
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Étudiant:</span>
                  <span className="font-medium">{result?.utilisateur?.nom ?? ""}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Matricule:</span>
                  <span className="font-medium">{result?.utilisateur?.matricule ?? ""}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Note:</span>
                  <span className="font-bold text-lg text-primary-custom">
                    {formatNote(result?.note_obtenue)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Soumission:</span>
                  <span className="font-medium">{result?.heure_soumission ?? "---"}</span>
                </div>
              </div>
            </Card>

            <h2 className="text-xl font-bold tracking-tight mb-6">Détail des réponses</h2>
            <div className="space-y-3">
              {result?.reponses?.map((reponse: any, index: number) => (
                <Card key={index} className="border-border">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded font-medium uppercase">
                          {reponse?.question?.type_question ?? ""}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-primary-custom">
                        Note: {reponse?.score_question ?? "?"}
                      </span>
                    </div>
                    <p className="font-medium mb-2">
                      <HelpCircle className="w-4 h-4 inline mr-1.5 text-muted-foreground" />
                      {reponse?.question?.texte_question ?? ""}
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Réponse :</p>
                      <p className="text-sm">{reponse?.reponse_texte ?? ""}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AdminResponseView;
