import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginInterface } from "@/interfaces/user.interface";
import { LoginValidation } from "@/validation/user.validation";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Loader2, GraduationCap } from "lucide-react";

const LoginPage: React.FC = () => {
  const { login, logout } = useAuth();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
  } = useForm<LoginInterface>({
    resolver: yupResolver(LoginValidation),
  });

  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (data: LoginInterface) => {
    setLoginLoading(true);
    await login(data);
    setLoginLoading(false);
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
          <h1 className="text-4xl font-bold text-white mb-4">E-Exam</h1>
          <p className="text-lg text-white/80 max-w-md">
            Plateforme de gestion d'examens en ligne. Connectez-vous pour accéder à votre espace.
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
              <h2 className="text-2xl font-bold tracking-tight">Connexion</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Connectez-vous à votre compte
              </p>
            </div>

            <form onSubmit={submit(handleSubmit)} className="space-y-5">
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
                {errors?.email && (
                  <p className="text-xs text-destructive">{errors?.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        id="password"
                        value={value ?? ""}
                        onChange={onChange}
                        onBlur={onBlur}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        className={errors?.password ? "border-destructive ring-destructive/20 pr-10" : "pr-10"}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors?.password && (
                  <p className="text-xs text-destructive">{errors?.password.message}</p>
                )}
              </div>

              <Button disabled={loginLoading} type="submit" className="w-full h-11">
                {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loginLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link to="/signup" className="text-primary-custom font-medium hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
