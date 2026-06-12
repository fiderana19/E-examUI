import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useGetResultByGroupId } from "@/hooks/result/useGetResultByGroupId";
import { useDownloadResult } from "@/hooks/result/useDownloadResult";
import { FileText, Loader2, Download, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFixation";

const StudentResult: React.FC = () => {
  const { token } = useAuth();
  const { data: results, isLoading } = useGetResultByGroupId(
    token ? JSON.parse(atob(token.split(".")[1])).id_groupe : 0,
  );
  const [selectedToDowload, setSelectedToDownload] = useState<any>();
  const {
    data: download_data,
    isLoading: dowloadLoading,
    refetch: dowloadRefetch,
  } = useDownloadResult(Number(selectedToDowload?.id_resultat) | 0);

  useEffect(() => {
    if (download_data && selectedToDowload?.fichier_resultat) {
      const blobData = download_data?.data;
      const fileName = formatFileName(selectedToDowload.fichier_resultat);
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  }, [download_data]);

  const formatFileName = (data: string) => {
    if (!data) return "";
    const parts = data.split("/");
    return parts[1] || parts[0];
  };

  const handleDownload = async (data: any) => {
    setSelectedToDownload(data);
    dowloadRefetch();
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <StudentNavigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Mes résultats</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Consultez et téléchargez vos résultats publiés
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : results?.length > 0 ? (
          <div className="space-y-4">
            {results.map((result: any, index: number) => (
              <Card key={index} className="border-border card-hover overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-custom/10 text-primary-custom flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{result.titre_resultat ?? ""}</h3>
                        <p className="text-xs text-muted-foreground">
                          Publié le {formatDate(result?.created_at)}
                        </p>
                      </div>
                    </div>
                    <Button
                      disabled={dowloadLoading}
                      onClick={() => handleDownload(result)}
                      variant="outline"
                      size="sm"
                    >
                      {dowloadLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Télécharger
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t border-border">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">{formatFileName(result?.fichier_resultat)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <XCircle className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">Aucun résultat disponible</h3>
            <p className="text-sm text-muted-foreground/60">
              Vos résultats apparaîtront ici une fois publiés par les enseignants
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResult;
