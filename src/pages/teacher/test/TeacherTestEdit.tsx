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
import { useGetTestById } from "@/hooks/test/useGetTestById";
import { usePatchTest } from "@/hooks/test/usePatchTest";
import { TestEditInterface } from "@/interfaces/test.interface";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { TestEditValidation } from "@/validation/test.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarClock, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherTestEdit: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { token } = useAuth();
  const { data: groupes } = useGetAllGroup();
  const { data: test, refetch, isLoading } = useGetTestById(Id ? Number(Id) : 0);
  const { refetch: refetchTestByTeacher } = useGetAllTestByTeacherId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<TestEditInterface>({
    resolver: yupResolver(TestEditValidation),
  });
  const { mutateAsync: modifierTest, isPending: editLoading } = usePatchTest({
    action() {
      refetch();
      refetchTestByTeacher();
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (test) {
      setValue("id_utilisateur", String(test.id_utilisateur ?? ""));
      setValue("id_test", Id ?? "");
      setValue("id_groupe", String(test.id_groupe ?? ""));
      setValue("titre", test.titre ?? "");
      setValue("description", test.description ?? "");
      setValue("duree_minutes", test.duree_minutes ?? 0);
    }
  }, [test]);

  const handleSubmit = async (data: TestEditInterface) => {
    const response = await modifierTest(data);
    if (response?.status === HttpStatus.OK) navigate("/teacher/test");
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-2xl mx-auto">
        <PageHeader
          title="Modifier un test"
          subtitle="Modifiez les informations du test"
          onBack={() => navigate("/teacher/test")}
        />

        <Card className="border-border overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <CalendarClock className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Modification du test</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
            </div>
          ) : test ? (
            <form onSubmit={submit(handleSubmit)} className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Groupe</Label>
                <Controller
                  control={control}
                  name="id_groupe"
                  defaultValue={test.id_groupe}
                  render={({ field: { value, onChange } }) => (
                    <Select disabled value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={value} />
                      </SelectTrigger>
                      <SelectContent>
                        {groupes?.map((groupe: any, index: number) => (
                          <SelectItem key={index} value={groupe.id_groupe}>
                            {groupe.nom_groupe}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
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
                  defaultValue={test.titre}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value ?? ""}
                      onChange={onChange}
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
                  defaultValue={test.description}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value ?? ""}
                      onChange={onChange}
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
                  defaultValue={test.duree_minutes}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      type="number"
                      value={value ? Number(value) : 0}
                      onKeyPress={handleNumberKeyPress}
                      onChange={onChange}
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

export default TeacherTestEdit;
