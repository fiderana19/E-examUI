import AdminNavigation from "@/components/Navigation/AdminNavigation";
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
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { useDeleteResult } from "@/hooks/result/useDeleteResult";
import { useGetAllResult } from "@/hooks/result/useGetAllResult";
import { usePostResult } from "@/hooks/result/usePostResult";
import { PostCreateInterface } from "@/interfaces/post.interface";
import { PostCreateValidation } from "@/validation/post.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Download, FileText, Loader2, Plus, Trash, XCircle } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatDate } from "../../utils/dateFixation";
import { useDownloadResult } from "@/hooks/result/useDownloadResult";

const AdminResult: React.FC = () => {
  const { token } = useAuth();
  const { data: groupes } = useGetAllGroup();
  const { data: results, refetch, isLoading } = useGetAllResult();
  const [selectedResult, setSelectedResult] = useState<number>(0);
  const [selectedToDowload, setSelectedToDownload] = useState<any>();
  const { data: download_data, isLoading: dowloadLoading, refetch: dowloadRefetch } = useDownloadResult(Number(selectedToDowload?.id_resultat) | 0);
  const { mutateAsync: publierResultat, isPending: createLoading } = usePostResult({ action() { refetch(); } });
  const { mutateAsync: supprimerResultat, isPending: deleteLoading } = useDeleteResult({ action() { refetch(); } });
  const { handleSubmit: submit, formState: { errors }, control, setValue, clearErrors } = useForm<PostCreateInterface>({
    resolver: yupResolver(PostCreateValidation),
  });

  useEffect(() => {
    setValue("id_utilisateur", token ? token.split("/")[0] : "");
    setValue("fichier_resultat", null as any);
  }, []);

  useEffect(() => {
    if (download_data && selectedToDowload?.fichier_resultat) {
      const blobData = download_data?.data;
      const fileName = String(formatFileName(selectedToDowload.fichier_resultat));
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  }, [download_data]);

  const handleSubmit = async (data: PostCreateInterface) => { await publierResultat(data); };
  const deleteConfirm = async () => { await supprimerResultat(selectedResult); };
  const handleDownload = async (data: any) => { setSelectedToDownload(data); dowloadRefetch(); };

  const formatFileName = (data: string) => {
    if (!data) return "";
    const parts = data.split("/");
    return parts[1] || parts[0];
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try { setValue("fichier_resultat", file); clearErrors("fichier_resultat"); } catch (e) {}
    }
  };

  const getGroupNameById = (id: number | string | undefined): string | undefined => {
    if (!id) return undefined;
    const groupe = groupes?.find((g: any) => String(g.id_groupe) === String(id));
    return groupe ? groupe.nom_groupe : undefined;
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <AdminNavigation />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Résultats publiés</h1>
            <p className="text-sm text-muted-foreground mt-1">Publiez et gérez les résultats des examens</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" /> Nouvelle publication
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6 mr-6" align="end">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Publier un résultat</h3>
              </div>
              <form onSubmit={submit(handleSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Groupe</Label>
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
                            {groupes?.map((groupe: any, i: number) => (
                              <SelectItem key={i} value={String(groupe.id_groupe)}>
                                {groupe.nom_groupe}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                  {errors?.id_groupe && <p className="text-xs text-destructive">{errors?.id_groupe.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre</Label>
                  <Controller
                    control={control}
                    name="titre_resultat"
                    render={({ field: { value, onChange } }) => (
                      <Input id="titre" value={value ?? ""} onChange={onChange} className={errors?.titre_resultat ? "border-destructive" : ""} />
                    )}
                  />
                  {errors?.titre_resultat && <p className="text-xs text-destructive">{errors?.titre_resultat.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fichier">Fichier PDF</Label>
                  <Input id="fichier" type="file" onChange={handleFileChange} className={errors?.fichier_resultat ? "border-destructive" : ""} />
                  {errors?.fichier_resultat && <p className="text-xs text-destructive">{errors?.fichier_resultat.message}</p>}
                </div>
                <Button disabled={createLoading} type="submit" className="w-full">
                  {createLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Publier
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : !results?.length ? (
          <div className="text-center py-20">
            <XCircle className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Aucun résultat publié pour l'instant</h3>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((res: any, index: any) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{res?.titre_resultat ?? ""}</h3>
                      <p className="text-xs text-muted-foreground">{res?.groupe?.nom_groupe ?? ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={dowloadLoading}
                      onClick={() => handleDownload(res)}
                      variant="outline"
                      size="icon"
                    >
                      {dowloadLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Suppression de la publication</AlertDialogTitle>
                          <AlertDialogDescription>Voulez-vous vraiment supprimer cette publication ?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction className="p-0">
                            <Button onClick={() => deleteConfirm()} variant="destructive" disabled={deleteLoading}>
                              {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                              Supprimer
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Publié le {formatDate(res?.created_at)}</span>
                  <span className="text-xs text-muted-foreground">{formatFileName(res?.fichier_resultat)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResult;
