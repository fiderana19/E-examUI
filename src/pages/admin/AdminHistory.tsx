import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Input } from "@/components/ui/input";
import { mock_tests } from "@/constants/mock";
import { useGetAllCorrectedTestForAdmin } from "@/hooks/test/useGetAllCorrectedTestForAdmin";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHistory: React.FC = () => {
  const navigate = useNavigate();
  const { data: results, isLoading } = useGetAllCorrectedTestForAdmin();
  const [searchRef, setSearchRef] = useState<string>("");

  return (
    <div className="pl-64 pr-6">
      <AdminNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center">
          <div className="text-xl uppercase font-bold">
            {" "}
            Les resultats dejà corrigés
          </div>
          <Input
            className="w-48"
            placeholder="Titre du test..."
            onChange={(e) => setSearchRef(e.target.value)}
          />
        </div>
        {
          isLoading && <div className="text-5xl flex justify-center">
            <LoadingOutlined />
          </div>
        }
        {results && results.length < 1 && (
          <div className="w-max mx-auto text-center text-gray-600">
            <CloseOutlined className="text-7xl" />
            <div className="mt-4 text-xl">Aucun historique pour l'instant.</div>
          </div>
        )}
        {results && results.length < 1 && (
          <div className="w-max mx-auto text-center text-gray-600 my-10 hidden">
            <CloseOutlined className="text-7xl" />
            <div className="mt-4 text-xl">Vous avez aucune resultat</div>
          </div>
        )}
        <div className="">
          {results &&
            results.map((test: any, index: any) => {
              if (searchRef && !test.titre.includes(searchRef)) {
                return null;
              }
              return (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/admin/history/view/${test.id_test}`)
                  }
                  className="shadow p-4 bg-white my-2 cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4 text-lg">
                      <div className=""> {test.titre} du</div>
                      <div className="text-gray-800 font-bold">
                        {test.date_declechement}
                      </div>
                    </div>
                    <div className="font-bold text-gray-800">
                      {" "}
                      {test.group.nom_groupe}{" "}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminHistory;
