import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Input } from "@/components/ui/input";
import { useGetAllCorrectedTestForAdmin } from "@/hooks/test/useGetAllCorrectedTestForAdmin";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFixation";

const AdminHistory: React.FC = () => {
  const navigate = useNavigate();
  const { data: results, isLoading } = useGetAllCorrectedTestForAdmin();
  const [searchRef, setSearchRef] = useState<string>("");

  const filtered = results?.filter((test: any) =>
    !searchRef || test?.titre?.toLowerCase().includes(searchRef.toLowerCase())
  );

  return (
    <div className="ml-64 min-h-screen bg-background">
      <AdminNavigation />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Historique des tests corrigés</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Consultez les résultats des examens déjà corrigés
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
              {searchRef ? "Aucun résultat trouvé" : "Aucun historique pour l'instant"}
            </h3>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((test: any, index: any) => (
              <div
                key={index}
                onClick={() => test?.id_test && navigate(`/admin/history/view/${test.id_test}`)}
                className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-custom/10 text-primary-custom flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{test?.titre ?? ""}</h3>
                      <p className="text-sm text-muted-foreground">{test?.group?.nom_groupe ?? ""}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(test?.date_declechement)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHistory;
