import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/PageHeader";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { QUESTION_TYPE } from "@/enum/question.enum";
import { useGetAllQuestionByTestId } from "@/hooks/question/useGetAllQuestionByTestId";
import { useGetQuestionById } from "@/hooks/question/useGetQuestionById";
import { usePatchQuestion } from "@/hooks/question/usePatchQuestion";
import { QuestionEditInterface } from "@/interfaces/question.interface";
import { QuestionEditValidation } from "@/validation/question.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { HelpCircle, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherQuestionEdit: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const navigate = useNavigate();
  const { token } = useAuth();
  const { data: question, isLoading, refetch: refetchQuestion } = useGetQuestionById(Id ? Number(Id) : 0);
  const { refetch } = useGetAllQuestionByTestId(question ? question.id_test : 0);
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<QuestionEditInterface>({
    resolver: yupResolver(QuestionEditValidation),
  });
  const { mutateAsync: modifierQuestion, isPending: editLoading } = usePatchQuestion({
    action() {
      refetch();
      refetchQuestion();
    },
  });

  useEffect(() => {
    if (question) {
      setValue("id_question", Id ?? "");
      setValue("id_utilisateur", token ? JSON.parse(atob(token.split(".")[1])).id : "");
      setValue("texte_question", question.texte_question ?? "");
      setValue("type_question", question.type_question ?? "");
      setValue("reponse_correcte", question.reponse_correcte ?? "");
    }
  }, [question]);

  const handleSubmit = async (data: QuestionEditInterface) => {
    const response = await modifierQuestion(data);
    if (response?.status === HttpStatus.OK) navigate(-1);
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-2xl mx-auto">
        <PageHeader
          title="Modifier une question"
          subtitle="Modifiez le contenu de la question"
          onBack={() => navigate(-1)}
        />

        <Card className="border-border overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <HelpCircle className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Modification de la question</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
            </div>
          ) : question ? (
            <form onSubmit={submit(handleSubmit)} className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Question</Label>
                <Controller
                  control={control}
                  name="texte_question"
                  defaultValue={question.texte_question}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value ?? ""}
                      onChange={onChange}
                      className={errors?.texte_question ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors?.texte_question && (
                  <p className="text-xs text-destructive">{errors?.texte_question.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Type</Label>
                <Controller
                  control={control}
                  name="type_question"
                  defaultValue={question.type_question}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      disabled
                      value={value ?? ""}
                      onChange={onChange}
                      className={errors?.type_question ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors?.type_question && (
                  <p className="text-xs text-destructive">{errors?.type_question.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Réponse correcte</Label>
                <Controller
                  control={control}
                  name="reponse_correcte"
                  defaultValue={question.reponse_correcte}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      disabled={question.type_question !== QUESTION_TYPE.REPONSE_COURTE}
                      value={value ?? ""}
                      onChange={onChange}
                      className={errors?.reponse_correcte ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors?.reponse_correcte && (
                  <p className="text-xs text-destructive">{errors?.reponse_correcte.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Annuler
                </Button>
                <Button disabled={editLoading} type="submit">
                  {editLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Modifier
                </Button>
              </div>
            </form>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default TeacherQuestionEdit;
