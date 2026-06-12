import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/PageHeader";
import { useGetAllCorrectedTestByTeacherId } from "@/hooks/test/useGetAllCorrectedTestByTeacherId";
import { Loader2, FileText, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFixation";

const TeacherResult: React.FC = () => {
  const { data: results, isLoading, refetch } = useGetAllCorrectedTestByTeacherId();
  const navigate = useNavigate();
  const [searchRef, setSearchRef] = useState<string>("");

  useEffect(() => { refetch(); }, []);

  const filteredResults = results?.filter((test: any) =>
    !searchRef || test?.titre?.toLowerCase()?.includes(searchRef.toLowerCase())
  );

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8">
        <PageHeader
          title="Tests corrigés"
          subtitle="Consultez les résultats des tests terminés"
          action={
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="w-48 pl-9"
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Titre du test..."
              />
            </div>
          }
        />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : filteredResults?.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResults.map((test: any, index: number) => (
              <div
                key={index}
                onClick={() => test?.id_test && navigate(`/teacher/result/view/${test.id_test}`)}
                className="bg-card border border-border rounded-xl p-6 card-hover cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary-custom/10 shrink-0">
                    <FileText className="w-5 h-5 text-primary-custom" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{test?.titre ?? ""}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(test?.date_declechement)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{test?.group?.nom_groupe ?? ""}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <X className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {searchRef ? "Aucun résultat trouvé" : "Aucun test corrigé"}
            </h3>
            <p className="text-sm text-muted-foreground/60">
              {searchRef ? "Essayez un autre terme de recherche" : "Les tests corrigés apparaîtront ici"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherResult;
