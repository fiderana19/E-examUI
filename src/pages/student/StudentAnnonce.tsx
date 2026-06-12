import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useGetAnnonceByGroupId } from "@/hooks/annonce/useGetAnnonceByGroupId";
import { Bell, Loader2, Search, XCircle } from "lucide-react";
import React, { useState } from "react";
import { formatDate } from "../../utils/dateFixation";

const StudentAnnonce: React.FC = () => {
  const [searchRef, setSearchRef] = useState<string>("");
  const { token } = useAuth();
  const { data: annonces, isLoading } = useGetAnnonceByGroupId(
    token ? JSON.parse(atob(token.split(".")[1])).id_groupe : 0,
  );

  const filtered = annonces?.data?.filter((a: any) =>
    !searchRef || a?.texte_annonce?.toLowerCase().includes(searchRef.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <StudentNavigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Les annonces</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Consultez les annonces publiées par vos enseignants
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="Mot clé..."
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
              {searchRef ? "Aucune annonce trouvée" : "Aucune annonce pour l'instant"}
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((announce: any, index: any) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-custom/10 text-primary-custom flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{announce?.titre_annonce ?? ""}</h3>
                      <p className="text-xs text-muted-foreground">{formatDate(announce?.creation_annonce)}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-13 pl-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">{announce?.texte_annonce ?? ""}</p>
                  <p className="text-xs font-medium text-primary-custom mt-2">— {announce?.utilisateur?.nom ?? ""}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAnnonce;
