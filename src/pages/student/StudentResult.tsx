import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Card } from "@/components/ui/card";
import { mock_resultats } from "@/constants/mock";
import { useAuth } from "@/context/AuthContext";
import { useGetResultByGroupId } from "@/hooks/result/useGetResultByGroupId";
import {
  CloseOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { formatDate } from "../../utils/dateFixation";
import { Button } from "@/components/ui/button";
import { useDownloadResult } from "@/hooks/result/useDownloadResult";

const StudentResult: React.FC = () => {
  const { token } = useAuth();
  const { data: results } = useGetResultByGroupId(
    token ? JSON.parse(atob(token.split(".")[1])).id_groupe : 0,
  );
  const [selectedToDowload, setSelectedToDownload] = useState<number>(0);
  const {
    data,
    isLoading: dowloadLoading,
    refetch: dowloadRefetch,
  } = useDownloadResult(Number(selectedToDowload) | 0);

  const formatFileName = (data: string) => {
    const res = data.split("/")[1];

    return res;
  };

  const handleDownload = async (data: any) => {
    setSelectedToDownload(data);
    dowloadRefetch();
  };

  return (
    <div className="pt-20 pb-10 px-[12%] min-h-screen">
      <StudentNavigation />
      <div>
        <div className="text-gray-800 text-xl font-bold mb-10">
          Les resultats
        </div>
        {results && results.length < 1 && (
          <div className="w-max mx-auto text-center text-gray-600">
            <CloseOutlined className="text-7xl" />
            <div className="mt-4 text-xl">Aucun resultat disponible.</div>
          </div>
        )}
        <div className="my-6">
          {results &&
            results.map((result: any, index: any) => {
              return (
                <Card key={index} className="px-4 my-1">
                  <div>
                    <div className="justify-between flex">
                      <div className="text-xs text-gray-600">
                        Publié le {formatDate(result.created_at)}
                      </div>
                      <Button
                        disabled={dowloadLoading}
                        onClick={() => handleDownload(result.id_resultat)}
                        variant={"secondary"}
                        size={"icon"}
                        className="text-xs text-gray-600"
                      >
                        {dowloadLoading && <LoadingOutlined />}{" "}
                        <DownloadOutlined />
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-medium">
                        {" "}
                        {result.titre_resultat}{" "}
                      </div>
                      <div className="text-gray-700 font-bold">
                        <FilePdfOutlined className=" mr-2" />{" "}
                        {formatFileName(result.fichier_resultat)}{" "}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
