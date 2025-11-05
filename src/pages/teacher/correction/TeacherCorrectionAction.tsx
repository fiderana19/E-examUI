import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetReponseById } from "@/hooks/reponse/useGetReponseById";
import { usePatchReponseForCorrection } from "@/hooks/reponse/usePatchReponseForCorrection";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { GivePointsInterface } from "@/interfaces/response.interface";
import { GivePointsValidation } from "@/validation/response.validation";
import { HourglassOutlined, LoadingOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { handleFloatKeyPress } from "../../../utils/handleKeyPress";
import { HttpStatus } from "@/constants/Http_status";
import { useGetReponseByTestId } from "@/hooks/reponse/useGetReponseByTestId";

const TeacherCorrectionAction: React.FC = () => {
  const req = useParams();
  const testId = req.testId;
  const reponseId = req.reponseId;
  const navigate = useNavigate();
  const { data: test, isLoading: testLoading, refetch: refetchTest } = useGetTestById(testId ? Number(testId) : 0);
  const { refetch: refetchAllReponse } = useGetReponseByTestId(
    testId ? Number(testId) : 0
  );  
  const { data: reponse, refetch, isLoading: reponseLoading } = useGetReponseById(
    reponseId ? Number(reponseId) : 0,
  );
  const { mutateAsync: corrigerReponse, isPending: corrigerLoading } = usePatchReponseForCorrection({
    action() {
      refetch();
      refetchTest();
      refetchAllReponse();
    },
  });
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<GivePointsInterface>({
    resolver: yupResolver(GivePointsValidation),
  });

  useEffect(() => {
    setValue("id_reponse", reponseId ? String(reponseId) : "");
  }, []);

  const handleSubmit = async (data: GivePointsInterface) => {
    const res = await corrigerReponse(data);
    if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED) {
      navigate(-1);
    }
  };

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-800 text-xl font-bold flex items-center gap-2">
            <Button onClick={() => navigate(-1)} variant={"secondary"}>
              <ChevronLeft />
            </Button>
            Correction d'un test
          </div>
        </div>
        <div className="">
          {
            testLoading && <div className="text-5xl flex justify-center">
              <LoadingOutlined />
            </div>
          }
          {test && (
            <div className="shadow px-4 py-2 bg-white my-2">
              <div className="flex justify-between">
                <div className="flex gap-4 text-lg">
                  <div className=""> {test.titre} du</div>
                  <div className="text-gray-800 font-bold">
                    {test.date_declechement}
                  </div>
                  <div className="flex">
                    {test.status === "Terminé" ? (
                      <div className="text-xs border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                        <HourglassOutlined /> <div>Terminé</div>
                      </div>
                    ) : test.status === "En cours" ? (
                      <div className="text-xs border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                        <HourglassOutlined /> <div>En cours</div>
                      </div>
                    ) : (
                      <div className="text-xs border rounded-full px-1 bg-yellow-200 text-white flex items-center gap-2">
                        <HourglassOutlined /> <div>En attente</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-bold text-gray-800">
                  {" "}
                  {test.nom_groupe}{" "}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {
            reponseLoading && <div className="text-5xl flex justify-center">
              <LoadingOutlined />
            </div>
          }
          {reponse && (
            <div className="mb-2 px-4 py-2 cursor-pointer border rounded">
              <div>
                <div className="flex justify-end">
                  <div className="my-1 font-semibold">
                    Note maximum : {reponse.question.points}
                  </div>
                </div>
                <div className="font-semibold">
                  Question : {reponse.question.texte_question}{" "}
                </div>
                <div className="text-gray-700">
                  Reponse de l'étudiant : {reponse.reponse_texte}{" "}
                </div>
              </div>
            </div>
          )}
          <Card className="w-max mx-auto">
            <form onSubmit={submit(handleSubmit)} className="w-64 p-4">
              <Label className="mb-1">Note pour ce reponse : </Label>
              <Controller
                control={control}
                name="score_question"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value ? value : 0}
                    onChange={onChange}
                    onKeyPress={handleFloatKeyPress}
                    className={`${errors?.score_question && "border border-red-500 text-red-500 rounded"}`}
                  />
                )}
              />
              {errors?.score_question && (
                <div className="text-xs w-full text-red-500 text-left">
                  {errors?.score_question.message}
                </div>
              )}
              <Button disabled={corrigerLoading} type="submit" className="mt-4 w-full">
                { corrigerLoading && <LoadingOutlined /> }
                Noter
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherCorrectionAction;
