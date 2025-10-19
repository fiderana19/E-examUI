import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { styles, TableHeader, TableRow } from "@/components/ResultPDF";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mockResultData } from "@/constants/mock";
import { useGetTentativeForResultByTestId } from "@/hooks/tentative/useGetTentativeForResultByTestId";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Document, Page, PDFDownloadLink, PDFViewer, Text, View } from "@react-pdf/renderer";
import { BookText } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherResultView: React.FC  = () => {
    const req = useParams();
    const Id = req.id;
    const navigate = useNavigate();
    const { data: result } = useGetTentativeForResultByTestId(Id ? Number(Id) : 0);

    const ResultDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>      
          <View style={styles.header}>
            <View style={styles.flexBetween}>
              <View style={styles.flexNormal}>
                <Text style={styles.headerTitle}>Classe: </Text>
                <Text style={styles.headerSubtitle}>M1IG</Text>
              </View>
              <View style={styles.flexNormal}>
                <Text style={styles.headerTitle}>Test:</Text>
                <Text style={styles.headerSubtitle}>Technologie web avancée</Text>
              </View>
              <View style={styles.flexNormal}>
                <Text style={styles.headerTitle}>Session:</Text>
                <Text style={styles.headerSubtitle}>02/04/2025 15:10</Text>
              </View>
            </View>
          </View>

          <View style={styles.summary}>
            <Text style={styles.summaryText}>Total participants: {mockResultData.participants}</Text>
            <Text style={styles.summaryText}>Égal ou au-dessus de la moyenne: {mockResultData.auDessusDeMoyenne}</Text>
            <Text style={styles.summaryText}>En dessous de la moyenne: {mockResultData.participants - mockResultData.auDessusDeMoyenne}</Text>
          </View>

          <View style={styles.table}>
            <TableHeader />
            {mockResultData.resultats.map((resultat, index) => (
              <TableRow key={index} data={resultat} index={index} />
            ))}
          </View>

        </Page>
      </Document>
    );
    
    return <div className="pl-64 pr-6">
        <TeacherNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-800 text-xl font-bold flex items-center gap-2"><BookText /> Resultat du 2025-12-12</div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline"><FilePdfOutlined /> Generer</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Resultat</SheetTitle>
                  </SheetHeader>
                  <div>
                    {
                      mockResultData && <PDFViewer className="h-screen w-full">
                        <ResultDocument />
                      </PDFViewer>
                    }
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="">
              <div className="border p-2">
                <div>Groupe: M1IG</div>
                <div>Examen HTML</div>
                <div>Session du 2025-10-10 15:00</div>
              </div>
              <div className="p-2">
                <div>Total participants: 300</div>
                <div>Egal ou au dessus de la moyenne: 250</div>
                <div>En dessous de la moyenne: 50</div>
              </div>
            <table className=' min-w-full divide-y divide-gray-200 my-4'>
              <thead>
                <tr>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Note</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Heure de soumission</th>
                  </tr>
                </thead> 
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> d </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                  </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
}

export default TeacherResultView;