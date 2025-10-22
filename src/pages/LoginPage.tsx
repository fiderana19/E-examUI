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
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const LoginPage: React.FC = () => {
  const { login, logout } = useAuth();
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
  }, [])

  const handleSubmit = async (data: LoginInterface) => {
    await login(data);
  };

  const handlePasswordVisible = async () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="text-3xl font-bold text-center my-4">E-Exam</div>
        <Card className="px-4 py-10">
          <div className="font-extrabold text-xl text-center">Connexion</div>
          <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
            <Label className="mb-1">Adresse mail :</Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  className={`${errors?.email && "border border-red-500 text-red-500 rounded"}`}
                />
              )}
            />
            {errors?.email && (
              <div className="text-xs w-full text-red-500 text-left">
                {errors?.email.message}
              </div>
            )}
            <Label htmlFor="password" className="mb-1 mt-4">
              Mot de passe :
            </Label>
            <div className="relative">
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    type={!!isPasswordVisible ? "text" : "password"}
                    className={`${errors?.password && "border border-red-500 text-red-500 rounded"}`}
                  />
                )}
              />
              {isPasswordVisible ? (
                <EyeInvisibleOutlined
                  onClick={handlePasswordVisible}
                  className="absolute top-1.5 right-1.5 cursor-pointer p-1.5"
                />
              ) : (
                <EyeOutlined
                  onClick={handlePasswordVisible}
                  className="absolute top-1.5 right-1.5 cursor-pointer p-1.5"
                />
              )}
            </div>
            {errors?.password && (
              <div className="text-xs w-full text-red-500 text-left">
                {errors?.password.message}
              </div>
            )}
            <div className="flex justify-center mt-4">
              <Button type="submit">Se connecter</Button>
            </div>
          </form>
          <Link to="/signup" className="w-max mx-auto">
            <Button variant={"link"} className="w-max">
              S'incrire
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
