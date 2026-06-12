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
import { useDeleteGroup } from "@/hooks/group/useDeleteGroup";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { usePostGroup } from "@/hooks/group/usePostGroup";
import { AddGroupInterface } from "@/interfaces/groupe.interface";
import { AddGroupValidation } from "@/validation/group.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookOpen, Loader2, Plus, Trash, Edit } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AdminGroupe: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const { data: groupes, refetch, isLoading } = useGetAllGroup();
  const { mutateAsync: creerGroupe, isPending: createLoading } = usePostGroup({
    action() { refetch(); },
  });
  const { mutateAsync: supprimerGroupe, isPending: deleteLoading } = useDeleteGroup({
    action() { refetch(); },
  });
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    reset,
  } = useForm<AddGroupInterface>({
    resolver: yupResolver(AddGroupValidation),
  });

  const handleSubmit = async (data: AddGroupInterface) => {
    await creerGroupe(data);
    reset();
  };

  const deleteConfirm = async () => {
    await supprimerGroupe(selectedGroup);
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <AdminNavigation />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Les groupes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gérez les groupes d'étudiants
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" /> Nouveau groupe
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6 mr-14" align="end">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Nouveau groupe</h3>
                <p className="text-sm text-muted-foreground">Ajoutez un nouveau groupe d'étudiants</p>
              </div>
              <form onSubmit={submit(handleSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom_groupe">Nom</Label>
                  <Controller
                    control={control}
                    name="nom_groupe"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        id="nom_groupe"
                        value={value ?? ""}
                        onChange={onChange}
                        placeholder="Nom du groupe"
                        className={errors?.nom_groupe ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors?.nom_groupe && <p className="text-xs text-destructive">{errors?.nom_groupe.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        id="description"
                        value={value ?? ""}
                        onChange={onChange}
                        placeholder="Description du groupe"
                        className={errors?.description ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors?.description && <p className="text-xs text-destructive">{errors?.description.message}</p>}
                </div>
                <Button disabled={createLoading} type="submit" className="w-full">
                  {createLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Ajouter
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : !groupes?.length ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Aucun groupe</h3>
            <p className="text-sm text-muted-foreground/60 mt-1">Créez votre premier groupe</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {groupes.map((group: any, index: any) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{group.nom_groupe}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{group.description ?? "—"}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => navigate(`/admin/groupe/edit/${group.id_groupe}`)}
                          variant="outline"
                          size="icon"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              onClick={() => setSelectedGroup(group.id_groupe)}
                              variant="destructive"
                              size="icon"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Suppression du groupe</AlertDialogTitle>
                              <AlertDialogDescription>
                                Voulez-vous vraiment supprimer ce groupe ?
                              </AlertDialogDescription>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGroupe;
