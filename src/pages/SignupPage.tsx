import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupInterface } from "@/interfaces/user.interface";
import { SignupValidation } from "@/validation/user.validation";
import { Link } from "react-router-dom";
import { useSignup } from "@/hooks/user/useSignup";
import { HttpStatus } from "@/constants/Http_status";
import { Loader2, GraduationCap, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";

const SignupPage: React.FC = () => {
  const { data: groupes } = useGetAllGroup();
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
    reset,
  } = useForm<SignupInterface>({
    resolver: yupResolver(SignupValidation),
  });
  const { mutateAsync: signup, isPending } = useSignup({ action() {} });
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const getGroupNameById = (id: number | string | undefined): string | undefined => {
    if (!id) return undefined;
    const groupe = groupes?.find((g: any) => String(g.id_groupe) === String(id));
    return groupe ? groupe.nom_groupe : undefined;
  };

  const handleSubmit = async (data: SignupInterface) => {
    const response = await signup(data);
    reset();
    if (response.status === HttpStatus.CREATED || response?.status === HttpStatus.OK) {
      reset();
      setSuccessMessage(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/10" />
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-8 shadow-xl">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Rejoignez E-Exam</h1>
          <p className="text-lg text-white/80 max-w-md">
            Créez votre compte pour accéder à la plateforme d'examens en ligne.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-custom/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">E-Exam</span>
          </div>

          <Card className="p-8 border-border/50 shadow-xl shadow-black/5">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Inscription</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Créez votre compte étudiant
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 rounded-lg bg-six-custom/10 border border-six-custom/20 text-sm">
                <div className="flex justify-end mb-1">
                  <button onClick={() => setSuccessMessage(false)}>
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-six-custom font-medium">
                  Votre compte est maintenant en attente de la validation de l'administrateur !
                </p>
              </div>
            )}

            <form onSubmit={submit(handleSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Controller
                  control={control}
                  name="nom"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="nom"
                      value={value ?? ""}
                      onChange={onChange}
                      placeholder="Votre nom"
                      className={errors?.nom ? "border-destructive ring-destructive/20" : ""}
                    />
                  )}
                />
                {errors?.nom && <p className="text-xs text-destructive">{errors?.nom.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricule">Matricule</Label>
                <Controller
                  control={control}
                  name="matricule"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="matricule"
                      value={value ?? ""}
                      onChange={onChange}
                      placeholder="Votre matricule"
                      className={errors?.matricule ? "border-destructive ring-destructive/20" : ""}
                    />
                  )}
                />
                {errors?.matricule && <p className="text-xs text-destructive">{errors?.matricule.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupe">Groupe</Label>
                <Controller
                  control={control}
                  name="id_groupe"
                  defaultValue=""
                  render={({ field: { value, onChange } }) => {
                    const displayedGroupName = getGroupNameById(value);
                    return (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className={errors?.id_groupe ? "border-destructive ring-destructive/20" : ""}>
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
                {errors?.id_groupe && <p className="text-xs text-destructive">{errors?.id_groupe.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse mail</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="email"
                      value={value ?? ""}
                      onChange={onChange}
                      placeholder="exemple@email.com"
                      className={errors?.email ? "border-destructive ring-destructive/20" : ""}
                    />
                  )}
                />
                {errors?.email && <p className="text-xs text-destructive">{errors?.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="password"
                      value={value ?? ""}
                      onChange={onChange}
                      type="password"
                      placeholder="••••••••"
                      className={errors?.password ? "border-destructive ring-destructive/20" : ""}
                    />
                  )}
                />
                {errors?.password && <p className="text-xs text-destructive">{errors?.password.message}</p>}
              </div>

              <Button disabled={isPending} type="submit" className="w-full h-11">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isPending ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Déjà un compte ?{" "}
                <Link to="/" className="text-primary-custom font-medium hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
