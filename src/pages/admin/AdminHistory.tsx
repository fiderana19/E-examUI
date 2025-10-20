import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Input } from "@/components/ui/input";
import { mock_tests } from "@/constants/mock";
import { CloseOutlined } from "@ant-design/icons";
import { BookText } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHistory: React.FC = () => {
  const navigate = useNavigate();
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
        <div className="w-max mx-auto text-center text-gray-600 my-10 hidden">
          <CloseOutlined className="text-7xl" />
          <div className="mt-4 text-xl">Vous avez aucune resultat</div>
        </div>
        <div className="">
          {mock_tests.map((res: any, index: any) => {
            if (searchRef && !res.titre.includes(searchRef)) {
              return null;
            }
            return (
              <div
                key={index}
                onClick={() => navigate(`/admin/history/view/${res.id_test}`)}
                className="shadow p-4 bg-white my-2 cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className="flex gap-4 text-lg">
                    <div className=""> {res.titre} du</div>
                    <div className="text-gray-800 font-bold">
                      {res.date_declenchement}
                    </div>
                  </div>
                  <div className="font-bold text-gray-800">
                    {" "}
                    {res.id_groupe}{" "}
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
