import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useGetAllTestForCorrectionByTeacherId } from "@/hooks/test/useGetAllTestForCorrectionByTeacherId";
import StatusBadge from "@/components/StatusBadge";
import { FileEdit, Loader2, Search, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFixation";

const TeacherCorrection: React.FC = () => {
  const navigate = useNavigate();
  const [searchRef, setSearchRef] = useState<string>("");
  const { token } = useAuth();
  const { data: tests, refetch, isLoading } = useGetAllTestForCorrectionByTeacherId(
    token ? Number(JSON.parse(atob(token.split(".")[1])).id) : 0,
  );

  useEffect(() => { refetch(); }, []);

  const filtered = tests?.filter((test: any) =>
    !searchRef || test.titre?.toLowerCase().includes(searchRef.toLowerCase())
  );

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vos corrections</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Corrigez les copies soumises par les étudiants
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="Titre du test..."
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : !filtered?.length ? (
          <div className="text-center py-20">
            <XCircle className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              {searchRef ? "Aucun test trouvé" : "Vous avez aucune correction à faire"}
            </h3>
            <p className="text-sm text-muted-foreground/60 mt-1">
              {searchRef ? "Essayez un autre terme de recherche" : "Les tests à corriger apparaîtront ici"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((test: any, index: any) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5 card-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold truncate">{test.titre ?? ""}</h3>
                      <StatusBadge status={test.status} />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>du {formatDate(test?.date_declechement)}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span>{test?.nom_groupe ?? ""}</span>
                    </div>
                  </div>
                  <Button onClick={() => navigate(`/teacher/correction/view/${test.id_test}`)}>
                    <FileEdit className="w-4 h-4" /> Corriger
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

export default TeacherCorrection;
