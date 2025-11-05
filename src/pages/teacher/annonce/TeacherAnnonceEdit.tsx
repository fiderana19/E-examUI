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
import { useGetAnnonceById } from "@/hooks/annonce/useGetAnnonceById";
import { usePatchAnnonce } from "@/hooks/annonce/usePatchAnnonce";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { AnnounceEditInterface } from "@/interfaces/announce.interface";
import { EditAnnounceValidation } from "@/validation/announce.validation";
import { LoadingOutlined, NotificationOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const TeacherAnnounceEdit: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { token } = useAuth();
  const { data: annonce, refetch, isLoading } = useGetAnnonceById(Id ? Number(Id) : 0);
  const { data: groupes, refetch: refetchGroupe } = useGetAllGroup();
  const { mutateAsync: modifierAnnonce, isPending: editLoading } = usePatchAnnonce({
    action() {
      refetch();
      refetchGroupe();
    },
  });
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<AnnounceEditInterface>({
    resolver: yupResolver(EditAnnounceValidation),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setValue("id_annonce", Id ? String(Id) : "");
    setValue(
      "id_utilisateur",
      token ? JSON.parse(atob(token.split(".")[1])).id : "",
    );
  }, []);

  const handleSubmit = async (data: AnnounceEditInterface) => {
    const response = await modifierAnnonce(data);
    if (response?.status === HttpStatus.OK) {
      navigate("/teacher/announce");
    }
  };

  return (
    <div className="pl-64 pr-[4%] py-6 min-h-screen flex flex-col justify-center">
      <TeacherNavigation />
      <div>
        <div className="w-1/3 mx-auto">
          <Card className="px-4 py-10">
            <div>
              <div className="text-xl uppercase font-bold text-center mb-4">
                <NotificationOutlined /> Modifier une annonce
              </div>
              {
                isLoading && <div className="text-5xl flex justify-center">
                  <LoadingOutlined />
                </div>
              }
              {annonce && (
                <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                  <Label className="mb-1">Groupe :</Label>
                  <Controller
                    control={control}
                    name="id_groupe"
                    defaultValue={annonce.id_groupe}
                    render={({ field: { value, onChange } }) => (
                      <Select disabled value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
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
                    name="titre_annonce"
                    defaultValue={annonce.titre_annonce}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        className={`${errors?.titre_annonce && "border border-red-500 text-red-500 rounded"}`}
                      />
                    )}
                  />
                  {errors?.titre_annonce && (
                    <div className="text-xs w-full text-red-500 text-left">
                      {errors?.titre_annonce.message}
                    </div>
                  )}
                  <Label className="mb-1 mt-4">Description :</Label>
                  <Controller
                    control={control}
                    name="texte_annonce"
                    defaultValue={annonce.texte_annonce}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        className={`${errors?.texte_annonce && "border border-red-500 text-red-500 rounded"}`}
                      />
                    )}
                  />
                  {errors?.texte_annonce && (
                    <div className="text-xs w-full text-red-500 text-left">
                      {errors?.texte_annonce.message}
                    </div>
                  )}
                  <div className="mt-4 flex justify-end gap-2">
                    <Link
                      to="/teacher/announce"
                      className="px-4 py-0.5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80"
                    >
                      Annuler
                    </Link>
                    <Button disabled={editLoading} type="submit">
                      { editLoading && <LoadingOutlined /> }
                      Modifier
                    </Button>
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

export default TeacherAnnounceEdit;
