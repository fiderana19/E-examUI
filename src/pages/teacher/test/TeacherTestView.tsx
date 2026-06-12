import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useDeleteQuestion } from "@/hooks/question/useDeleteQuestion";
import { useGetAllQuestionByTestId } from "@/hooks/question/useGetAllQuestionByTestId";
import { usePostQuestion } from "@/hooks/question/usePostQuestion";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { QuestionCreateInterface } from "@/interfaces/question.interface";
import { QuestionCreateValidation } from "@/validation/question.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ChevronLeft,
  Clock,
  HelpCircle,
  Loader2,
  Plus,
  Edit,
  Trash,
  FileQuestion,
  ListChecks,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherTestView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { token } = useAuth();
  const { data: test, isLoading: testLoading, refetch: refetchTest } = useGetTestById(Id ? Number(Id) : 0);
  const { data: questions, refetch, isLoading: questionLoading } = useGetAllQuestionByTestId(Id ? Number(Id) : 0);
  const { mutateAsync: createQuestion, isPending: createLoading } = usePostQuestion({
    action() { refetch(); refetchTest(); },
  });
  const { mutateAsync: deleteQuestion, isPending: deleteLoading } = useDeleteQuestion({
    action() { refetch(); refetchTest(); },
  });
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const navigate = useNavigate();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<QuestionCreateInterface>({
    resolver: yupResolver(QuestionCreateValidation),
    defaultValues: {
      id_utilisateur: token ? JSON.parse(atob(token.split(".")[1])).id : "",
      id_test: Id ?? "",
      type_question: "",
      texte_question: "",
      reponse_correcte: "",
    },
  });

  useEffect(() => {
    setValue("id_utilisateur", token ? JSON.parse(atob(token.split(".")[1])).id : "");
    setValue("id_test", Id ?? "");
  }, []);

  const handleSubmit = async (data: QuestionCreateInterface) => {
    await createQuestion(data);
    reset();
  };

  const deleteConfirm = async () => {
    await deleteQuestion(selectedQuestion);
  };

  const typeLabels: Record<string, string> = {
    qcm: "QCM",
    "reponse courte": "Réponse courte",
    developpement: "À développer",
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-5xl mx-auto">
        <Button
          onClick={() => navigate("/teacher/test")}
          variant="outline"
          size="sm"
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Retour
        </Button>

        {testLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : test ? (
          <>
            <Card className="border-border overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <FileQuestion className="w-5 h-5 text-white" />
                    <h1 className="text-lg font-semibold text-white">{test.titre ?? ""}</h1>
                  </div>
                  <StatusBadge status={test.status} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-6 text-sm mb-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{test.duree_minutes ?? "?"} min</span>
                  </div>
                  <div className="text-muted-foreground font-medium">{test?.nom_groupe ?? ""}</div>
                  <div className="text-muted-foreground">
                    <span className="font-medium">{test.max_questions ?? "?"}</span> questions max
                  </div>
                  <div className="text-muted-foreground">
                    Note max: <span className="font-medium">{test.note_max ?? "?"}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{test.description ?? ""}</p>
              </div>
            </Card>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Questions du test</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {questions?.length ?? 0} question(s)
                </p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4" /> Nouvelle question
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Ajouter une question</h3>
                    <form onSubmit={submit(handleSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Question</Label>
                        <Controller
                          control={control}
                          name="texte_question"
                          render={({ field: { value, onChange } }) => (
                            <Input
                              value={value ?? ""}
                              onChange={onChange}
                              placeholder="Texte de la question"
                              className={errors?.texte_question ? "border-destructive" : ""}
                            />
                          )}
                        />
                        {errors?.texte_question && (
                          <p className="text-xs text-destructive">{errors?.texte_question.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Type</Label>
                        <Controller
                          control={control}
                          name="type_question"
                          render={({ field: { value, onChange } }) => (
                            <Select value={value} onValueChange={onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="qcm">QCM</SelectItem>
                                <SelectItem value="reponse courte">Réponse courte</SelectItem>
                                <SelectItem value="developpement">À développer</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors?.type_question && (
                          <p className="text-xs text-destructive">{errors?.type_question.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Réponse correcte</Label>
                        <Controller
                          control={control}
                          name="reponse_correcte"
                          render={({ field: { value, onChange } }) => (
                            <Input
                              value={value ?? ""}
                              onChange={onChange}
                              placeholder="Réponse correcte"
                              className={errors?.reponse_correcte ? "border-destructive" : ""}
                            />
                          )}
                        />
                        {errors?.reponse_correcte && (
                          <p className="text-xs text-destructive">{errors?.reponse_correcte.message}</p>
                        )}
                      </div>
                      <Button disabled={createLoading} type="submit" className="w-full">
                        {createLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Ajouter
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {questionLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
              </div>
            ) : questions?.length > 0 ? (
              <div className="space-y-3">
                {questions.map((question: any, index: number) => (
                  <Card key={index} className="border-border card-hover">
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              {typeLabels[question.type_question] ?? question.type_question}
                            </span>
                            <span className="text-xs font-medium text-primary-custom">
                              {question.points ?? "?"} pt(s)
                            </span>
                          </div>
                          <p className="font-medium">{question.texte_question ?? ""}</p>
                        </div>
                      </div>

                      {question.reponse_correcte && (
                        <div className="text-sm text-muted-foreground mb-3">
                          <span className="font-medium">Réponse: </span>
                          {question.reponse_correcte}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-3 border-t border-border">
                        {question.type_question === "qcm" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/teacher/qcm/${question.id_question}`)}
                          >
                            <ListChecks className="w-4 h-4" /> Options QCM
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/teacher/question/edit/${question.id_question}`)}
                        >
                          <Edit className="w-4 h-4" /> Modifier
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setSelectedQuestion(question.id_question)}
                            >
                              <Trash className="w-4 h-4" /> Supprimer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Suppression d'une question</AlertDialogTitle>
                              <AlertDialogDescription>
                                Voulez-vous vraiment supprimer cette question ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction className="p-0">
                                <Button
                                  disabled={deleteLoading}
                                  onClick={deleteConfirm}
                                  variant="destructive"
                                >
                                  {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                  Supprimer
                                </Button>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Aucune question</h3>
                <p className="text-sm text-muted-foreground/60">
                  Ajoutez des questions à ce test en utilisant le bouton ci-dessus
                </p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TeacherTestView;
