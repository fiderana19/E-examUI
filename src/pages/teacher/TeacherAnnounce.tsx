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
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useDeleteAnnonce } from "@/hooks/annonce/useDeleteAnnonce";
import { useGetAnnonceByUserId } from "@/hooks/annonce/useGetAnnonceByUserId";
import { usePostAnnonce } from "@/hooks/annonce/usePostAnnonce";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { AnnounceAddInterface } from "@/interfaces/announce.interface";
import { AddAnnounceValidation } from "@/validation/announce.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Bell, Edit, Loader2, Megaphone, Plus, Search, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFixation";

const TeacherAnnounce: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [selectedAnnonce, setSelectedAnnonce] = useState<number>(0);
  const { data: annonces, refetch, isLoading } = useGetAnnonceByUserId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );
  const { data: groupes } = useGetAllGroup();
  const { mutateAsync: creerAnnonce, isPending: createLoading } = usePostAnnonce({
    action() { refetch(); },
  });
  const { mutateAsync: deleteAnnonce, isPending: deleteLoading } = useDeleteAnnonce({
    action() { refetch(); },
  });
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<AnnounceAddInterface>({
    resolver: yupResolver(AddAnnounceValidation),
  });
  const [searchRef, setSearchRef] = useState<string>("");

  useEffect(() => {
    setValue("id_utilisateur", token ? JSON.parse(atob(token.split(".")[1])).id : "");
  }, []);

  const handleSubmit = async (data: AnnounceAddInterface) => {
    await creerAnnonce(data);
    reset();
  };

  const deleteConfirm = async () => {
    await deleteAnnonce(selectedAnnonce);
  };

  const getGroupNameById = (id: number | string | undefined): string | undefined => {
    if (!id) return undefined;
    const groupe = groupes?.find((g: any) => String(g.id_groupe) === String(id));
    return groupe ? groupe.nom_groupe : undefined;
  };

  const filteredAnnonces = annonces?.data?.filter((announce: any) =>
    !searchRef || announce?.texte_annonce?.toLowerCase()?.includes(searchRef.toLowerCase()) ||
    announce?.titre_annonce?.toLowerCase()?.includes(searchRef.toLowerCase())
  );

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8">
        <PageHeader
          title="Vos annonces"
          subtitle="Gérez les annonces destinées aux groupes"
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="w-56 pl-9"
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder="Titre ou description..."
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4" /> Nouvelle annonce
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Nouvelle annonce</h3>
                    <form onSubmit={submit(handleSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Groupe</Label>
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
                        <Label className="text-xs">Titre</Label>
                        <Controller
                          control={control}
                          name="titre_annonce"
                          render={({ field: { value, onChange } }) => (
                            <Input
                              value={value ?? ""}
                              onChange={onChange}
                              placeholder="Titre de l'annonce"
                              className={errors?.titre_annonce ? "border-destructive" : ""}
                            />
                          )}
                        />
                        {errors?.titre_annonce && (
                          <p className="text-xs text-destructive">{errors?.titre_annonce.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Controller
                          control={control}
                          name="texte_annonce"
                          render={({ field: { value, onChange } }) => (
                            <Input
                              value={value ?? ""}
                              onChange={onChange}
                              placeholder="Contenu de l'annonce"
                              className={errors?.texte_annonce ? "border-destructive" : ""}
                            />
                          )}
                        />
                        {errors?.texte_annonce && (
                          <p className="text-xs text-destructive">{errors?.texte_annonce.message}</p>
                        )}
                      </div>
                      <Button disabled={createLoading} type="submit" className="w-full">
                        {createLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Megaphone className="w-4 h-4" />
                        )}
                        Annoncer
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          }
        />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : filteredAnnonces?.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnonces.map((announce: any, index: number) => (
              <Card key={index} className="border-border card-hover overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Bell className="w-3.5 h-3.5" />
                      <span>{formatDate(announce?.creation_annonce)}</span>
                    </div>
                    <span className="text-xs font-medium bg-primary-custom/10 text-primary-custom px-2 py-0.5 rounded">
                      {announce?.group?.nom_groupe ?? ""}
                    </span>
                  </div>
                  <div className="border-l-2 border-primary-custom pl-4">
                    <h3 className="font-semibold mb-1">{announce?.titre_annonce ?? ""}</h3>
                    <p className="text-sm text-muted-foreground">{announce?.texte_annonce ?? ""}</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/teacher/announce/edit/${announce.id_annonce}`)}
                    >
                      <Edit className="w-4 h-4" /> Modifier
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setSelectedAnnonce(announce.id_annonce)}
                        >
                          <Trash className="w-4 h-4" /> Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Suppression d'une annonce</AlertDialogTitle>
                          <AlertDialogDescription>
                            Voulez-vous vraiment supprimer l'annonce ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction className="p-0">
                            <Button
                              disabled={deleteLoading}
                              onClick={deleteConfirm}
                              variant="destructive"
                            >
                              {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                              Supprimer
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Megaphone className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {searchRef ? "Aucune annonce trouvée" : "Vous n'avez fait aucune annonce"}
            </h3>
            <p className="text-sm text-muted-foreground/60">
              {searchRef ? "Essayez un autre terme de recherche" : "Créez votre première annonce avec le bouton ci-dessus"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAnnounce;
