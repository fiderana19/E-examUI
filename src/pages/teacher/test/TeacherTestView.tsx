import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import {
  AlertDialog,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useDeleteQuestion } from "@/hooks/question/useDeleteQuestion";
import { useGetAllQuestionByTestId } from "@/hooks/question/useGetAllQuestionByTestId";
import { usePostQuestion } from "@/hooks/question/usePostQuestion";
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { QuestionCreateInterface } from "@/interfaces/question.interface";
import { QuestionCreateValidation } from "@/validation/question.validation";
import {
  ClockCircleOutlined,
  EditOutlined,
  HourglassOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherTestView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { token } = useAuth();
  const { data: test } = useGetTestById(Id ? Number(Id) : 0);
  const { data: questions, refetch } = useGetAllQuestionByTestId(
    Id ? Number(Id) : 0,
  );
  const { mutateAsync: createQuestion } = usePostQuestion({
    action() {
      refetch();
    },
  });
  const { mutateAsync: deleteQuestion } = useDeleteQuestion({
    action() {
      refetch();
    },
  });
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const navigate = useNavigate();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<QuestionCreateInterface>({
    resolver: yupResolver(QuestionCreateValidation),
    defaultValues: {
      id_utilisateur: token ? JSON.parse(atob(token.split(".")[1])).id : "",
      id_test: Id ? Id : "",
      type_question: "",
      texte_question: "",
      reponse_correcte: ""
    }
  });

  useEffect(() => {
    setValue("id_utilisateur", token ? JSON.parse(atob(token.split(".")[1])).id : "");
    setValue("id_test", Id ? Id : "");
  }, []);

  const handleSubmit = async (data: QuestionCreateInterface) => {
    console.log(data)
    await createQuestion(data);
  };

  const deleteConfirm = async () => {
    await deleteQuestion(selectedQuestion);
  }

  return (
    <div className="pl-64 pt-24 pr-6">
      <TeacherNavigation />
      {test && (
        <div className="shadow p-4 bg-white fixed top-0 right-0 w-[1110px]">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Button onClick={() => navigate("/teacher/test")} variant={'secondary'}><ChevronLeft /></Button> 
                <div className="font-bold text-lg"> {test.titre} </div>
                <div className="border rounded-full px-2 bg-gray-400 text-white">
                  <ClockCircleOutlined /> {test.duree_minutes}:00
                </div>
              </div>
              <div className="font-bold text-gray-800"> {test.nom_groupe} </div>
              {test.status === "Terminé" ? (
                <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                  <HourglassOutlined /> <div>Terminé</div>
                </div>
              ) : test.status === "En cours" ? (
                <div className="border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                  <HourglassOutlined /> <div>En cours</div>
                </div>
              ) : (
                <div className="border rounded-full px-2 bg-yellow-200 text-white flex items-center gap-2">
                  <HourglassOutlined /> <div>En attente</div>
                </div>
              )}
            </div>
            <div className="flex justify-between my-1">
              <div className="flex gap-4">
                <div className="font-bold text-lg text-gray-600">
                  {test.max_questions} questions max
                </div>
              </div>
              <div className="font-bold text-gray-800">
                Note maximum : {test.note_max}{" "}
              </div>
            </div>
            <div className="text-gray-700"> {test.description} </div>
          </div>
        </div>
      )}
      <div className="my-6">
        <div className="">
          <div className="px-10 py-4">
            <div className="flex justify-between items-center">
              <div className="uppercase font-bold">Les questions du test</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>
                    <Plus /> Nouvelle question
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto mr-16">
                  <div className="mb-2 text-gray-700 font-medium">
                    Nouvelle question
                  </div>
                  <form
                    onSubmit={submit(handleSubmit)}
                    className="w-64 mx-auto"
                  >
                    <Label className="mb-1">Question :</Label>
                    <Controller
                      control={control}
                      name="texte_question"
                      render={({ field: { value, onChange } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          className={`${errors?.texte_question && "border border-red-500 text-red-500 rounded"}`}
                        />
                      )}
                    />
                    {errors?.texte_question && (
                      <div className="text-xs w-full text-red-500 text-left">
                        {errors?.texte_question.message}
                      </div>
                    )}
                    <Label className="mb-1 mt-4">Type :</Label>
                    <Controller
                      control={control}
                      name="type_question"
                      render={({ field: { value, onChange } }) => (
                        <Select value={value} onValueChange={onChange} >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                                <SelectItem value='qcm'> QCM </SelectItem>
                                <SelectItem value='reponse courte'> Reponse courte </SelectItem>
                                <SelectItem value='developpement'> A developper </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors?.type_question && (
                      <div className="text-xs w-full text-red-500 text-left">
                        {errors?.type_question.message}
                      </div>
                    )}
                    <Label className="mb-1 mt-4">Reponse correcte :</Label>
                    <Controller
                      control={control}
                      name="reponse_correcte"
                      render={({ field: { value, onChange } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          className={`${errors?.reponse_correcte && "border border-red-500 text-red-500 rounded"}`}
                        />
                      )}
                    />
                    {errors?.reponse_correcte && (
                      <div className="text-xs w-full text-red-500 text-left">
                        {errors?.reponse_correcte.message}
                      </div>
                    )}
                    <div className="flex justify-center mt-4">
                      <Button type="submit">Ajouter</Button>
                    </div>
                  </form>
                </PopoverContent>
              </Popover>
            </div>
            <div className="my-2">
              {questions && questions.map((question: any, index: any) => {
                return (
                  <Card key={index} className="mb-2 px-4">
                    <div>
                      <div className="flex justify-between">
                        <div className="text-gray-600">
                          Type: {question.type_question}
                        </div>
                        <div className="my-1 font-semibold">
                          Note pour la question : {question.points} point(s)
                        </div>
                      </div>
                      <div className="font-semibold">
                        Question : {question.texte_question}{" "}
                      </div>
                      <div className="text-gray-700">
                        Reponse correcte : {question.reponse_correcte}
                      </div>
                      <div className="flex justify-end gap-2 items-center">
                        {question.type_question === "qcm" && (
                          <Button
                            onClick={() =>
                              navigate(`/teacher/qcm/${question.id_question}`)
                            }
                            variant={"secondary"}
                          >
                            <QuestionCircleOutlined /> Voir les options
                          </Button>
                        )}
                        <Button
                          onClick={() =>
                            navigate(
                              `/teacher/question/edit/${question.id_question}`,
                            )
                          }
                          variant={"secondary"}
                        >
                          <EditOutlined /> Modifier
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button onClick={() => setSelectedQuestion(question.id_question)} variant={"destructive"}>
                              <Trash /> Supprimer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Suppression d'une question
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Voulez-vous vraiment supprimer cette question ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <Button onClick={() => deleteConfirm()} variant={"destructive"}>Supprimer</Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTestView;
