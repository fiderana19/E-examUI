import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/StatusBadge";
import { useGetReponseById } from "@/hooks/reponse/useGetReponseById";
import { usePatchReponseForCorrection } from "@/hooks/reponse/usePatchReponseForCorrection";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { GivePointsInterface } from "@/interfaces/response.interface";
import { GivePointsValidation } from "@/validation/response.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, Clock, Loader2, HelpCircle, Award } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { handleFloatKeyPress } from "../../../utils/handleKeyPress";
import { formatDate } from "../../../utils/dateFixation";
import { HttpStatus } from "@/constants/Http_status";
import { useGetReponseByTestId } from "@/hooks/reponse/useGetReponseByTestId";

const TeacherCorrectionAction: React.FC = () => {
  const req = useParams();
  const testId = req.testId;
  const reponseId = req.reponseId;
  const navigate = useNavigate();
  const { data: test, isLoading: testLoading, refetch: refetchTest } = useGetTestById(testId ? Number(testId) : 0);
  const { refetch: refetchAllReponse } = useGetReponseByTestId(testId ? Number(testId) : 0);
  const { data: reponse, refetch, isLoading: reponseLoading } = useGetReponseById(reponseId ? Number(reponseId) : 0);
  const { mutateAsync: corrigerReponse, isPending: corrigerLoading } = usePatchReponseForCorrection({
    action() { refetch(); refetchTest(); refetchAllReponse(); },
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
    setValue("id_reponse", reponseId ?? "");
  }, []);

  const handleSubmit = async (data: GivePointsInterface) => {
    const res = await corrigerReponse(data);
    if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED) navigate(-1);
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-3xl mx-auto">
        <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="mb-6">
          <ChevronLeft className="w-4 h-4" /> Retour
        </Button>

        {testLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : test ? (
          <Card className="border-border overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-white" />
                  <h1 className="text-lg font-semibold text-white">Correction: {test.titre ?? ""}</h1>
                </div>
                <StatusBadge status={test.status} />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(test.date_declechement)}</span>
                </div>
                <span className="font-medium">{test?.nom_groupe ?? ""}</span>
              </div>
            </div>
          </Card>
        ) : null}

        {reponseLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : reponse ? (
          <div className="space-y-6">
            <Card className="border-border">
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="bg-muted px-2 py-0.5 rounded font-medium">
                    {reponse?.question?.type_question ?? ""}
                  </span>
                  <span className="font-medium text-primary-custom">
                    Note maximum: {reponse?.question?.points ?? "?"}
                  </span>
                </div>
                <p className="font-semibold mb-2">
                  <HelpCircle className="w-4 h-4 inline mr-1 text-muted-foreground" />
                  {reponse?.question?.texte_question ?? ""}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Réponse de l'étudiant :</p>
                  <p className="text-sm">{reponse?.reponse_texte ?? ""}</p>
                </div>
              </div>
            </Card>

            <Card className="border-border max-w-md mx-auto">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3">
                <div className="flex items-center gap-2 text-white">
                  <Award className="w-5 h-5" />
                  <h2 className="font-semibold">Attribuer une note</h2>
                </div>
              </div>
              <form onSubmit={submit(handleSubmit)} className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Note pour cette réponse</Label>
                  <Controller
                    control={control}
                    name="score_question"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        type="number"
                        step="0.25"
                        value={value ?? 0}
                        onChange={onChange}
                        onKeyPress={handleFloatKeyPress}
                        placeholder="0.00"
                        className={errors?.score_question ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors?.score_question && (
                    <p className="text-xs text-destructive">{errors?.score_question.message}</p>
                  )}
                </div>
                <Button disabled={corrigerLoading} type="submit" className="w-full">
                  {corrigerLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Noter
                </Button>
              </form>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TeacherCorrectionAction;
