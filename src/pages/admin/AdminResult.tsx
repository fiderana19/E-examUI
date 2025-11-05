import AdminNavigation from "@/components/Navigation/AdminNavigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mock_resultats } from "@/constants/mock";
import { useAuth } from "@/context/AuthContext";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { useDeleteResult } from "@/hooks/result/useDeleteResult";
import { useGetAllResult } from "@/hooks/result/useGetAllResult";
import { usePostResult } from "@/hooks/result/usePostResult";
import { PostCreateInterface } from "@/interfaces/post.interface";
import { PostCreateValidation } from "@/validation/post.validation";
import {
  DownloadOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Trash } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatDate } from "../../utils/dateFixation";
import { useDownloadResult } from "@/hooks/result/useDownloadResult";

const AdminResult: React.FC = () => {
  const { token } = useAuth();
  const { data: groupes } = useGetAllGroup();
  const { data: results, refetch } = useGetAllResult();
  const [selectedResult, setSelectedResult] = useState<number>(0);
  const [selectedToDowload, setSelectedToDownload] = useState<number>(0);
  const {
    data,
    isLoading: dowloadLoading,
    refetch: dowloadRefetch,
  } = useDownloadResult(Number(selectedToDowload) | 0);
  const { mutateAsync: publierResultat } = usePostResult({
    action() {
      refetch();
    },
  });
  const { mutateAsync: supprimerResultat } = useDeleteResult({
    action() {
      refetch();
    },
  });
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = useForm<PostCreateInterface>({
    resolver: yupResolver(PostCreateValidation),
  });

  useEffect(() => {
    setValue("id_utilisateur", token ? token.split("/")[0] : "");
    setValue("fichier_resultat", null);
  }, []);

  // useEffect(() => {
  //   let timeoutId: any;
  //   if (data && selectedResult !== 0) {
  //       timeoutId = setTimeout(() => {
  //           setSelectedResult(0);
  //           dowloadRefetch();
  //       }, 5000);
  //   }

  //   return () => {
  //       if (timeoutId) {
  //           clearTimeout(timeoutId);
  //       }
  //   };
  //   }, [selectedResult])

  const handleSubmit = async (data: PostCreateInterface) => {
    await publierResultat(data);
  };

  const deleteConfirm = async () => {
    await supprimerResultat(selectedResult);
  };

  const formatFileName = (data: string) => {
    const res = data.split("/")[1];

    return res;
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        setValue("fichier_resultat", file);
        clearErrors("fichier_resultat");
      } catch (error) {}
    }
  };

  return (
    <div className="pl-64 pr-6">
      <AdminNavigation />
      <div className="my-6">
        <div className="flex justify-between items-center">
          <div className="text-xl uppercase font-bold">
            Les resultats publiés
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Plus /> Nouvelle publication
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-6 mr-6">
              <div className="mb-2 text-gray-700 font-medium">
                Publier un resultat
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
                  name="titre_resultat"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      className={`${errors?.titre_resultat && "border border-red-500 text-red-500 rounded"}`}
                    />
                  )}
                />
                {errors?.titre_resultat && (
                  <div className="text-xs w-full text-red-500 text-left">
                    {errors?.titre_resultat.message}
                  </div>
                )}
                <Label className="mb-1 mt-4">Fichier :</Label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className={`${errors?.fichier_resultat && "border rounded text-red-500 border-red-500"}`}
                />
                {errors?.fichier_resultat && (
                  <div className="text-xs w-full text-red-500 text-left">
                    {errors?.fichier_resultat.message}
                  </div>
                )}
                <div className="flex justify-center mt-4">
                  <Button type="submit">Publier</Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="my-6">
        {results &&
          results.map((res: any, index: any) => {
            return (
              <Card key={index} className="px-4 my-1">
                <div>
                  <div className="justify-between flex">
                    <div className="text-xs text-gray-600">
                      Publié le {formatDate(res.created_at)}
                    </div>
                    <Button
                      disabled={dowloadLoading}
                      onClick={() => setSelectedToDownload(res.id_resultat)}
                      variant={"secondary"}
                      size={"icon"}
                      className="text-xs text-gray-600"
                    >
                      {dowloadLoading && <LoadingOutlined />}{" "}
                      <DownloadOutlined />
                    </Button>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">
                      {res.groupe.nom_groupe} | {res.titre_resultat}{" "}
                    </div>
                    <div className="text-gray-700 font-bold">
                      <FilePdfOutlined className=" mr-2" />{" "}
                      {formatFileName(res.fichier_resultat)}{" "}
                    </div>
                  </div>
                  <div className="flex justify-end gap-1 mt-2">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          onClick={() => setSelectedResult(res.id_resultat)}
                          variant={"destructive"}
                        >
                          <Trash /> Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Suppression de la publication d'un resultat
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Voulez-vous vraiment supprimer cette publication ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <Button
                            onClick={() => deleteConfirm()}
                            variant={"destructive"}
                          >
                            Supprimer
                          </Button>
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
  );
};

export default AdminResult;
