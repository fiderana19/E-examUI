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
import { usePostTest } from "@/hooks/test/usePostTest";
import { TestCreateInterface } from "@/interfaces/test.interface";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { TestCreateValidation } from "@/validation/test.validation";
import { LoadingOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarClock } from "lucide-react";
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
    action() {
      refetch();
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    setValue(
      "id_utilisateur",
      token ? JSON.parse(atob(token.split(".")[1])).id : "",
    );
  }, []);

  const handleSubmit = async (data: TestCreateInterface) => {
    const response = await createTest(data);
    if (response?.status === HttpStatus.CREATED) {
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
              <div className="text-xl uppercase font-bold text-center mb-4 flex items-center gap-2">
                <CalendarClock /> Ajouter un nouveau test
              </div>
              <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                <Label className="mb-1 mt-4">Groupe :</Label>
                <Controller
                  control={control}
                  name="id_groupe"
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onValueChange={onChange}>
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
                <div className="flex justify-center mt-4">
                  <Button disabled={createLoading} type="submit">
                    { createLoading && <LoadingOutlined /> }
                    Ajouter
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherTestAdd;
