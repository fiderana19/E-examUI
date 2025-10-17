import AdminNavigation from "@/components/Navigation/AdminNavigation";
import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import { BookText } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminHistoryView: React.FC  = () => {
    const req = useParams();
    const Id = req.id;
    const navigate = useNavigate();

    return <div className="pl-64 pr-6">
        <AdminNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center mb-4 ">
                <div className="text-gray-800 text-xl font-bold flex items-center gap-2"><BookText /> Resultat du 2025-12-12</div>
                <Button><FilePdfOutlined /> Generer</Button>
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
                  <tr onClick={() =>navigate("/admin/response/view")} className="cursor-pointer">
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

export default AdminHistoryView;