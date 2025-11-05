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
import { CalendarClock } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherTestEdit: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { token } = useAuth();
  const { data: groupes } = useGetAllGroup();
  const { data: test, refetch } = useGetTestById(Id ? Number(Id) : 0);
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
  const { mutateAsync: modifierTest } = usePatchTest({
    action() {
      refetch();
      refetchTestByTeacher();
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    setValue("id_utilisateur", test ? test.id_utilisateur : 0);
    setValue("id_test", Id ? Id : "");
  }, []);

  const handleSubmit = async (data: TestEditInterface) => {
    console.log(data);
    const response = await modifierTest(data);
    if (response?.status === HttpStatus.OK) {
      navigate("/teacher/test");
    }
  };

  return (
    <div className="pl-64 pr-[4%] py-10 flex flex-col justify-center">
      <TeacherNavigation />
      <div>
        <div className="w-1/3 mx-auto">
          <Card className="px-4 py-10">
            <div>
              <div className="text-lg uppercase font-bold text-center mb-4 flex items-center gap-2">
                <CalendarClock /> Modifier un test
              </div>
              {test && (
                <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                  <Label className="mb-1 mt-4">Groupe :</Label>
                  <Controller
                    control={control}
                    name="id_groupe"
                    defaultValue={test.id_groupe}
                    render={({ field: { value, onChange } }) => (
                      <Select disabled value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={value} />
                        </SelectTrigger>
                        <SelectContent>
                          {groupes &&
                            groupes.map((groupe: any, index: number) => (
                              <SelectItem key={index} value={groupe.id_groupe}>
                                {" "}
                                {groupe.nom_groupe}{" "}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors?.id_groupe && (
                    <div className="text-xs w-full text-red-500 text-left">
                      {errors?.id_groupe.message}
                    </div>
                  )}
                  <Label className="mb-1 mt-4">Titre :</Label>
                  <Controller
                    control={control}
                    name="titre"
                    defaultValue={test.titre}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        className={`${errors?.titre && "border border-red-500 text-red-500 rounded"}`}
                      />
                    )}
                  />
                  {errors?.titre && (
                    <div className="text-xs w-full text-red-500 text-left">
                      {errors?.titre.message}
                    </div>
                  )}
                  <Label className="mb-1 mt-4">Description :</Label>
                  <Controller
                    control={control}
                    name="description"
                    defaultValue={test.description}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        className={`${errors?.description && "border border-red-500 text-red-500 rounded"}`}
                      />
                    )}
                  />
                  {errors?.description && (
                    <div className="text-xs w-full text-red-500 text-left">
                      {errors?.description.message}
                    </div>
                  )}
                  <Label className="mb-1 mt-4">Durée (minutes) :</Label>
                  <Controller
                    control={control}
                    name="duree_minutes"
                    defaultValue={test.duree_minutes}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value ? Number(value) : 0}
                        onKeyPress={handleNumberKeyPress}
                        onChange={onChange}
                        className={`${errors?.duree_minutes && "border border-red-500 text-red-500 rounded"}`}
                      />
                    )}
                  />
                  {errors?.duree_minutes && (
                    <div className="text-xs w-full text-red-500 text-left">
                      {errors?.duree_minutes.message}
                    </div>
                  )}
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      onClick={() => navigate("/teacher/test")}
                      variant={"secondary"}
                      className="w-max "
                    >
                      Annuler
                    </Button>
                    <Button type="submit">Modifier</Button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherTestEdit;
