import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { styles, TableHeader, TableRow } from "@/components/ResultPDF";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mockResultData } from "@/constants/mock";
import { useGetTentativeForResultByTestId } from "@/hooks/tentative/useGetTentativeForResultByTestId";
import { Document, Page, PDFViewer, Text, View } from "@react-pdf/renderer";
import {
  Loader2,
  ChevronLeft,
  ClipboardList,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/dateFixation";

const AdminHistoryView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const { data: results, isLoading } = useGetTentativeForResultByTestId(Id ? Number(Id) : 0);

  const firstResult = results?.[0];
  const testData = firstResult?.test;

  const ResultDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.flexBetween}>
            <View style={styles.flexNormal}>
              <Text style={styles.headerTitle}>Classe: </Text>
              <Text style={styles.headerSubtitle}>{testData?.group?.nom_groupe ?? ""}</Text>
            </View>
            <View style={styles.flexNormal}>
              <Text style={styles.headerTitle}>Test:</Text>
              <Text style={styles.headerSubtitle}>{testData?.titre ?? ""}</Text>
            </View>
            <View style={styles.flexNormal}>
              <Text style={styles.headerTitle}>Session:</Text>
              <Text style={styles.headerSubtitle}>{formatDate(testData?.date_declechement)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total participants: {firstResult?.total ?? ""}</Text>
          <Text style={styles.summaryText}>Égal ou au-dessus de la moyenne: {firstResult?.sup ?? ""}</Text>
          <Text style={styles.summaryText}>En dessous de la moyenne: {firstResult?.sous ?? ""}</Text>
        </View>
        <View style={styles.table}>
          <TableHeader />
          {testData?.tentatives?.map((resultat: any, index: number) => (
            <TableRow key={index} data={resultat} index={index} />
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="ml-64 min-h-screen bg-background">
      <AdminNavigation />
      <div className="p-8 max-w-6xl mx-auto">
        <Button onClick={() => navigate("/admin/history")} variant="outline" size="sm" className="mb-6">
          <ChevronLeft className="w-4 h-4" /> Retour
        </Button>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : firstResult && testData ? (
          <>
            <Card className="border-border overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-5 h-5 text-white" />
                    <h1 className="text-lg font-semibold text-white">Résultats: {testData?.titre ?? ""}</h1>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4" /> Aperçu PDF
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[90vw] sm:max-w-3xl">
                      <SheetHeader>
                        <SheetTitle>Résultat</SheetTitle>
                      </SheetHeader>
                      <div className="h-[calc(100vh-8rem)] mt-4">
                        <PDFViewer className="w-full h-full border-0">
                          <ResultDocument />
                        </PDFViewer>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>{testData?.group?.nom_groupe ?? ""}</span>
                  <span>•</span>
                  <span>Session du {formatDate(testData?.date_declechement)}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Users className="w-8 h-8 text-primary-custom" />
                    <div>
                      <p className="text-xs text-muted-foreground">Participants</p>
                      <p className="text-2xl font-bold">{firstResult?.total ?? "0"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-six-custom/5">
                    <TrendingUp className="w-8 h-8 text-six-custom" />
                    <div>
                      <p className="text-xs text-muted-foreground">≥ Moyenne</p>
                      <p className="text-2xl font-bold text-six-custom">{firstResult?.sup ?? "0"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/5">
                    <TrendingDown className="w-8 h-8 text-destructive" />
                    <div>
                      <p className="text-xs text-muted-foreground">&lt; Moyenne</p>
                      <p className="text-2xl font-bold text-destructive">{firstResult?.sous ?? "0"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-500 to-cyan-600">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Matricule</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Note / 20</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Heure de soumission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {testData?.tentatives?.map((res: any, index: number) => (
                      <tr
                        key={index}
                        onClick={() => res?.id_tentative && navigate(`/admin/response/view/${res.id_tentative}`)}
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                      >
                        <td className="px-6 py-4 text-sm font-medium">{res?.utilisateur?.matricule ?? "---"}</td>
                        <td className="px-6 py-4 text-sm">{res?.utilisateur?.nom ?? "---"}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`font-semibold ${
                            res?.note_obtenue !== undefined && res?.note_obtenue !== null && res.note_obtenue >= 10
                              ? "text-six-custom" : "text-destructive"
                          }`}>
                            {res?.note_obtenue !== undefined && res?.note_obtenue !== null
                              ? (res.note_obtenue < 10 ? "0" : "") + res.note_obtenue
                              : "---"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{res?.heure_soumission ?? "---"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AdminHistoryView;
