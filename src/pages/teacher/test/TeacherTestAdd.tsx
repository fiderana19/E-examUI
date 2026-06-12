import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/PageHeader";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { useGetAllTestByTeacherId } from "@/hooks/test/useGetAllTestByTeacherId";
import { usePostTest } from "@/hooks/test/usePostTest";
import { TestCreateInterface } from "@/interfaces/test.interface";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { TestCreateValidation } from "@/validation/test.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarClock, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TeacherTestAdd: React.FC = () => {
  const { token } = useAuth();
  const { data: groupes } = useGetAllGroup();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<TestCreateInterface>({
    resolver: yupResolver(TestCreateValidation),
  });
  const { refetch } = useGetAllTestByTeacherId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const { mutateAsync: createTest, isPending: createLoading } = usePostTest({
    action() { refetch(); },
  });
  const navigate = useNavigate();

  useEffect(() => {
    setValue("id_utilisateur", token ? JSON.parse(atob(token.split(".")[1])).id : "");
  }, []);

  const handleSubmit = async (data: TestCreateInterface) => {
    const response = await createTest(data);
    if (response?.status === HttpStatus.CREATED) navigate("/teacher/test");
  };

  const getGroupNameById = (id: number | string | undefined): string | undefined => {
    if (!id) return undefined;
    const groupe = groupes?.find((g: any) => String(g.id_groupe) === String(id));
    return groupe ? groupe.nom_groupe : undefined;
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-2xl mx-auto">
        <PageHeader
          title="Ajouter un test"
          subtitle="Créez un nouveau test pour vos étudiants"
          onBack={() => navigate("/teacher/test")}
        />

        <Card className="border-border overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <CalendarClock className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Nouveau test</h2>
            </div>
          </div>

          <form onSubmit={submit(handleSubmit)} className="p-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Groupe</Label>
              <Controller
                control={control}
                name="id_groupe"
                render={({ field: { value, onChange } }) => {
                  const displayedGroupName = getGroupNameById(value);
                  return (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={displayedGroupName || "Sélectionner un groupe"} />
                      </SelectTrigger>
                      <SelectContent>
                        {groupes?.map((groupe: any, index: number) => (
                          <SelectItem key={index} value={String(groupe.id_groupe)}>
                            {groupe.nom_groupe}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              {errors?.id_groupe && (
                <p className="text-xs text-destructive">{errors?.id_groupe.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Titre</Label>
              <Controller
                control={control}
                name="titre"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value ?? ""}
                    onChange={onChange}
                    placeholder="Ex: Examen de mathématiques"
                    className={errors?.titre ? "border-destructive" : ""}
                  />
                )}
              />
              {errors?.titre && (
                <p className="text-xs text-destructive">{errors?.titre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Description</Label>
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value ?? ""}
                    onChange={onChange}
                    placeholder="Description du test..."
                    className={errors?.description ? "border-destructive" : ""}
                  />
                )}
              />
              {errors?.description && (
                <p className="text-xs text-destructive">{errors?.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Durée (minutes)</Label>
              <Controller
                control={control}
                name="duree_minutes"
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="number"
                    value={value ? Number(value) : 0}
                    onKeyPress={handleNumberKeyPress}
                    onChange={onChange}
                    placeholder="60"
                    className={errors?.duree_minutes ? "border-destructive" : ""}
                  />
                )}
              />
              {errors?.duree_minutes && (
                <p className="text-xs text-destructive">{errors?.duree_minutes.message}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => navigate("/teacher/test")}>
                Annuler
              </Button>
              <Button disabled={createLoading} type="submit">
                {createLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Ajouter
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TeacherTestAdd;
