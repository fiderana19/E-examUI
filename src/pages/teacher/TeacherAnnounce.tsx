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
import { useAuth } from "@/context/AuthContext";
import { useDeleteAnnonce } from "@/hooks/annonce/useDeleteAnnonce";
import { useGetAnnonceByUserId } from "@/hooks/annonce/useGetAnnonceByUserId";
import { usePostAnnonce } from "@/hooks/annonce/usePostAnnonce";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { AnnounceAddInterface } from "@/interfaces/announce.interface";
import { AddAnnounceValidation } from "@/validation/announce.validation";
import {
  CloseOutlined,
  LoadingOutlined,
  NotificationOutlined,
  NotificationTwoTone,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TeacherAnnounce: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [selectedAnnonce, setSelectedAnnonce] = useState<number>(0);
  const { data: annonces, refetch, isLoading } = useGetAnnonceByUserId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const { data: groupes } = useGetAllGroup();
  const { mutateAsync: creerAnnonce, isPending: createLoading } = usePostAnnonce({
    action() {
      refetch();
    },
  });
  const { mutateAsync: deleteAnnonce, isPending: deleteLoading } = useDeleteAnnonce({
    action() {
      refetch();
    },
  });
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
  } = useForm<AnnounceAddInterface>({
    resolver: yupResolver(AddAnnounceValidation),
  });
  const [searchRef, setSearchRef] = useState<string>("");

  useEffect(() => {
    setValue(
      "id_utilisateur",
      token ? JSON.parse(atob(token.split(".")[1])).id : "",
    );
  }, []);

  const handleSubmit = async (data: AnnounceAddInterface) => {
    await creerAnnonce(data);
  };

  const deleteConfirm = async () => {
    await deleteAnnonce(selectedAnnonce);
  };

  return (
    <div className="pl-64 pr-6">
      <TeacherNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center mb-10">
          <div className="text-gray-800 text-xl font-bold">
            <NotificationOutlined /> Vos annonces
          </div>
          <div className="flex gap-2 items-center">
            <Input
              className="w-60"
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="Description..."
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <Plus /> Nouvelle annonce
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto mr-6">
                <div className="mb-2 text-gray-700 font-medium">
                  Nouvelle annonce
                </div>
                <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                  <Label className="mb-1">Groupe :</Label>
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
                    name="titre_annonce"
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
                  <div className="flex justify-center mt-4">
                    <Button disabled={createLoading} type="submit">
                      {createLoading ? < LoadingOutlined /> : <NotificationOutlined />} Annoncer
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {
          isLoading && <div className="text-5xl flex justify-center">
            <LoadingOutlined />
          </div>
        }
        {annonces && annonces.length < 1 && (
          <div className="w-max mx-auto text-center text-gray-600 my-10">
            <CloseOutlined className="text-7xl" />
            <div className="mt-4 text-xl">Vous avez fait aucune annonce </div>
          </div>
        )}
        <div className="">
          {annonces &&
            annonces.map((announce: any, index: any) => {
              if (searchRef && !announce.texte_annonce.includes(searchRef)) {
                return null;
              }
              return (
                <Card key={index} className="mb-2">
                  <div className="px-4">
                    <div className="flex justify-between">
                      <div className="text-xs text-gray-600 mb-1">
                        {" "}
                        {announce.creation_annonce}{" "}
                      </div>
                      <div> {announce.group.nom_groupe} </div>
                    </div>
                    <blockquote className="border-l-2 pl-6 italic">
                      <NotificationTwoTone /> {announce.titre_annonce} <br />
                      {announce.texte_annonce}
                    </blockquote>
                    <div className="flex justify-end mt-2 gap-2">
                      <Button
                        onClick={() =>
                          navigate(
                            `/teacher/announce/edit/${announce.id_annonce}`,
                          )
                        }
                      >
                        <Edit /> Modifier
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            onClick={() =>
                              setSelectedAnnonce(announce.id_annonce)
                            }
                            variant={"destructive"}
                          >
                            <Trash /> Supprimer
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Suppression d'une annonce
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Voulez-vous vraiment supprimer l'annonce ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction className="p-0">
                              <Button
                              disabled={deleteLoading}
                                onClick={() => deleteConfirm()}
                                variant={"destructive"}
                              >
                                { deleteLoading && <LoadingOutlined /> }
                                Supprimer
                              </Button>
                            </AlertDialogAction>
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
  );
};

export default TeacherAnnounce;
