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
import { useGetAnnonceById } from "@/hooks/annonce/useGetAnnonceById";
import { usePatchAnnonce } from "@/hooks/annonce/usePatchAnnonce";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { AnnounceEditInterface } from "@/interfaces/announce.interface";
import { EditAnnounceValidation } from "@/validation/announce.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bell, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherAnnounceEdit: React.FC = () => {
  const req = useParams();
  const Id = req.id;
  const { token } = useAuth();
  const { data: annonce, refetch, isLoading } = useGetAnnonceById(Id ? Number(Id) : 0);
  const { data: groupes } = useGetAllGroup();
  const { mutateAsync: modifierAnnonce, isPending: editLoading } = usePatchAnnonce({
    action() { refetch(); },
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
    if (annonce) {
      setValue("id_annonce", Id ?? "");
      setValue("id_utilisateur", token ? JSON.parse(atob(token.split(".")[1])).id : "");
      setValue("titre_annonce", annonce.titre_annonce ?? "");
      setValue("texte_annonce", annonce.texte_annonce ?? "");
      setValue("id_groupe", String(annonce.id_groupe ?? ""));
    }
  }, [annonce]);

  const handleSubmit = async (data: AnnounceEditInterface) => {
    const response = await modifierAnnonce(data);
    if (response?.status === HttpStatus.OK) navigate("/teacher/announce");
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8 max-w-2xl mx-auto">
        <PageHeader
          title="Modifier une annonce"
          subtitle="Modifiez le contenu de l'annonce"
          onBack={() => navigate("/teacher/announce")}
        />

        <Card className="border-border overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <Bell className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Modification de l'annonce</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
            </div>
          ) : annonce ? (
            <form onSubmit={submit(handleSubmit)} className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Groupe</Label>
                <Controller
                  control={control}
                  name="id_groupe"
                  defaultValue={annonce.id_groupe}
                  render={({ field: { value, onChange } }) => (
                    <Select disabled value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue />
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
                  name="titre_annonce"
                  defaultValue={annonce.titre_annonce}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value ?? ""}
                      onChange={onChange}
                      className={errors?.titre_annonce ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors?.titre_annonce && (
                  <p className="text-xs text-destructive">{errors?.titre_annonce.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <Controller
                  control={control}
                  name="texte_annonce"
                  defaultValue={annonce.texte_annonce}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value ?? ""}
                      onChange={onChange}
                      className={errors?.texte_annonce ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors?.texte_annonce && (
                  <p className="text-xs text-destructive">{errors?.texte_annonce.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => navigate("/teacher/announce")}>
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

export default TeacherAnnounceEdit;
