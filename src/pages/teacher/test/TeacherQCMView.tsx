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
import { useDeleteOption } from "@/hooks/option/useDeleteOption";
import { useGetAllOptionByQuestionId } from "@/hooks/option/useGetAllOptionByQuestionId";
import { usePostOption } from "@/hooks/option/usePostOption";
import { useGetQuestionById } from "@/hooks/question/useGetQuestionById";
import { OptionCreateInterface } from "@/interfaces/option.interface";
import { OptionAddValidation } from "@/validation/option.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  Trash,
  ListChecks,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherQCMView: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { data: options, refetch, isLoading: optionLoading } = useGetAllOptionByQuestionId(Id ? Number(Id) : 0);
  const { data: question, isLoading: questionLoading, refetch: refetchQuestion } = useGetQuestionById(Id ? Number(Id) : 0);
  const { mutateAsync: deleteOption, isPending: deleteOptionLoading } = useDeleteOption({
    action() { refetch(); refetchQuestion(); },
  });
  const { mutateAsync: createOption, isPending: createOptionLoading } = usePostOption({
    action() { refetch(); refetchQuestion(); },
  });
  const navigate = useNavigate();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<OptionCreateInterface>({
    resolver: yupResolver(OptionAddValidation),
    defaultValues: {
      id_question: Id ?? "",
      est_correcte: false,
      texte_option: "",
    },
  });
  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    setValue("id_question", Id ?? "");
    setValue("est_correcte", false);
  }, []);

  const handleSubmit = async (data: OptionCreateInterface) => {
    await createOption(data);
    reset();
  };

  const deleteConfirm = async () => {
    await deleteOption(selectedOption);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("est_correcte", e.target.checked);
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-4xl mx-auto">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          size="sm"
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Retour
        </Button>

        {questionLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : question ? (
          <>
            <Card className="border-border overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <ListChecks className="w-5 h-5" />
                  <h1 className="text-lg font-semibold">Options de la question QCM</h1>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="bg-muted px-2 py-0.5 rounded font-medium">
                    {question.type_question ?? ""}
                  </span>
                  <span className="font-medium text-primary-custom">
                    {question.points ?? "?"} pt(s)
                  </span>
                </div>
                <p className="font-medium mb-1">{question.texte_question ?? ""}</p>
                {question.reponse_correcte && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Réponse correcte: </span>
                    {question.reponse_correcte}
                  </p>
                )}
              </div>
            </Card>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Options</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {options?.length ?? 0}/4 option(s)
                </p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button disabled={options && options.length > 3}>
                    <Plus className="w-4 h-4" /> Nouvelle option
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Ajouter une option</h3>
                    <form onSubmit={submit(handleSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Option</Label>
                        <Controller
                          control={control}
                          name="texte_option"
                          render={({ field: { value, onChange } }) => (
                            <Input
                              value={value ?? ""}
                              onChange={onChange}
                              placeholder="Texte de l'option"
                              className={errors?.texte_option ? "border-destructive" : ""}
                            />
                          )}
                        />
                        {errors?.texte_option && (
                          <p className="text-xs text-destructive">{errors?.texte_option.message}</p>
                        )}
                      </div>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-primary-custom"
                          onChange={handleCheckboxChange}
                        />
                        <span>Réponse correcte</span>
                      </label>
                      <Button disabled={createOptionLoading} type="submit" className="w-full">
                        {createOptionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Ajouter
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {optionLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
              </div>
            ) : options?.length > 0 ? (
              <div className="space-y-2">
                {options.map((option: any, index: number) => (
                  <Card key={index} className="border-border">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {option.est_correcte ? (
                          <CheckCircle className="w-5 h-5 text-six-custom shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive/60 shrink-0" />
                        )}
                        <span className={option.est_correcte ? "font-medium" : "text-muted-foreground"}>
                          {option.texte_option ?? ""}
                        </span>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => setSelectedOption(option.id_option)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Suppression d'une option</AlertDialogTitle>
                            <AlertDialogDescription>
                              Voulez-vous vraiment supprimer cette option ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction className="p-0">
                              <Button
                                disabled={deleteOptionLoading}
                                onClick={deleteConfirm}
                                variant="destructive"
                              >
                                {deleteOptionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                Supprimer
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <ListChecks className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Aucune option</h3>
                <p className="text-sm text-muted-foreground/60">
                  Ajoutez des options pour cette question QCM
                </p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TeacherQCMView;
