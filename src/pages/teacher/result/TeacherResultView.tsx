import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { styles, TableHeader, TableRow } from "@/components/ResultPDF";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mockResultData } from "@/constants/mock";
import { useGetTentativeForResultByTestId } from "@/hooks/tentative/useGetTentativeForResultByTestId";
import { CloseOutlined, FilePdfOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { BookText, ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherResultView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const { data: results, isLoading } = useGetTentativeForResultByTestId(
    Id ? Number(Id) : 0,
  );

  const ResultDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.flexBetween}>
            <View style={styles.flexNormal}>
              <Text style={styles.headerTitle}>Classe: </Text>
              <Text style={styles.headerSubtitle}>
                {results[0].test?.group.nom_groupe}
              </Text>
            </View>
            <View style={styles.flexNormal}>
              <Text style={styles.headerTitle}>Test:</Text>
              <Text style={styles.headerSubtitle}>
                {results[0].test?.titre}
              </Text>
            </View>
            <View style={styles.flexNormal}>
              <Text style={styles.headerTitle}>Session:</Text>
              <Text style={styles.headerSubtitle}>
                {results[0].test?.date_declechement}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total participants: {results[0].total}
          </Text>
          <Text style={styles.summaryText}>
            Égal ou au-dessus de la moyenne: {results[0].sup}
          </Text>
          <Text style={styles.summaryText}>
            En dessous de la moyenne:{results[0].sous}
          </Text>
        </View>

        <View style={styles.table}>
          <TableHeader />
          {results &&
            results[0]?.test?.tentatives?.map(
              (resultat: any, index: number) => (
                <TableRow key={index} data={resultat} index={index} />
              ),
            )}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      {
        isLoading && <div className="text-5xl flex justify-center">
          <LoadingOutlined />
        </div>
      }
      {results && (
        <div className="my-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-800 text-xl font-bold flex items-center gap-2">
              <Button
                onClick={() => navigate("/teacher/result")}
                variant={"secondary"}
              >
                <ChevronLeft />
              </Button>
              Resultat
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <FilePdfOutlined /> Generer
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Resultat</SheetTitle>
                </SheetHeader>
                <div>
                  {mockResultData && (
                    <PDFViewer className="h-screen w-full">
                      <ResultDocument />
                    </PDFViewer>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="">
            <div className="border p-2">
              <div>Groupe: {results[0].test?.group.nom_groupe}</div>
              <div>Examen {results[0].test?.titre}</div>
              <div>Session du {results[0].test?.date_declechement}</div>
            </div>
            <div className="p-2">
              <div>Total participants: {results[0].total}</div>
              <div>Egal ou au dessus de la moyenne: {results[0].sup}</div>
              <div>En dessous de la moyenne: {results[0].sous}</div>
            </div>
            <table className=" min-w-full divide-y divide-gray-200 my-4">
              <thead>
                <tr>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Matricule
                  </th>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Note / 20
                  </th>
                  <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Heure de soumission
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results[0].test?.tentatives.map((res: any, index: any) => {
                  return (
                    <tr
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/teacher/result/response/view/${res.id_tentative}`,
                        )
                      }
                      key={index}
                    >
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {res.utilisateur.matricule}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {res.utilisateur.nom}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {res.note_obtenue < 10 && "0"}
                        {res.note_obtenue}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {res.heure_soumission}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherResultView;
