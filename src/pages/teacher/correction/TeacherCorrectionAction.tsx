import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mock_reponseetudiants_a_corriger, mock_tests } from "@/constants/mock";
import { useGetReponseById } from "@/hooks/reponse/useGetReponseById";
import { usePatchReponseForCorrection } from "@/hooks/reponse/usePatchReponseForCorrection";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { GivePointsInterface } from "@/interfaces/response.interface";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { GivePointsValidation } from "@/validation/response.validation";
import { HourglassOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, Edit } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherCorrectionAction: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const { data } = useGetTestById(Id ? Number(Id) : 0);
  const { data: rep, refetch } = useGetReponseById(Id ? Number(Id) : 0);
  const test = mock_tests[0];
  const { mutateAsync: corrigerReponse } = usePatchReponseForCorrection({
    action() {
      refetch();
    },
  });
  const reponse = mock_reponseetudiants_a_corriger[0];
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<GivePointsInterface>({
    resolver: yupResolver(GivePointsValidation),
  });

  useEffect(() => {
    setValue("id_reponse", Id ? String(Id) : "");
  }, []);

  const handleSubmit = async (data: GivePointsInterface) => {
    await corrigerReponse(data);
    navigate("/teacher/correction/view");
  };

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-800 text-xl font-bold flex items-center gap-2">
            <Button onClick={() => navigate(-1)} variant={'secondary'}><ChevronLeft /></Button> 
            Correction d'un test
          </div>
        </div>
        <div className="">
          {test && (
            <div className="shadow px-4 py-2 bg-white my-2">
              <div className="flex justify-between">
                <div className="flex gap-4 text-lg">
                  <div className=""> {test.titre} du</div>
                  <div className="text-gray-800 font-bold">
                    {test.date_declenchement}
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
                  {test.id_groupe}{" "}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {reponse && (
            <div className="mb-2 px-4 py-2 cursor-pointer border rounded">
              <div>
                <div className="flex justify-end">
                  <div className="my-1 font-semibold">
                    Note maximum : {reponse.id_tentative} point(s)
                  </div>
                </div>
                <div className="font-semibold">
                  Question : {reponse.id_question}{" "}
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
                    value={value ? Number(value) : 0}
                    onChange={onChange}
                    onKeyPress={handleNumberKeyPress}
                    className={`${errors?.score_question && "border border-red-500 text-red-500 rounded"}`}
                  />
                )}
              />
              {errors?.score_question && (
                <div className="text-xs w-full text-red-500 text-left">
                  {errors?.score_question.message}
                </div>
              )}
              <Button type="submit" className="mt-4 w-full">
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
