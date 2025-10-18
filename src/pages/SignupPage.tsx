import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup'
import { SignupInterface } from "@/interfaces/user.interface";
import { SignupValidation } from "@/validation/user.validation";
import { Link } from "react-router-dom";
import { useSignup } from "@/hooks/user/useSignup";
import { HttpStatus } from "@/constants/Http_status";
import { CloseCircleFilled } from "@ant-design/icons";

const SignupPage: React.FC  = () => {
    const { handleSubmit: submit, formState: { errors }, control, reset, resetField } = useForm<SignupInterface>({
        resolver: yupResolver(SignupValidation)
    });
    const { mutateAsync: signup } = useSignup({action() {
        
    },});
    const [reponseText, setReponseText] = useState<boolean>(false)

    const handleSubmit = async (data: SignupInterface) => {
        const response = await signup(data);
        reset();
        if(response.status === HttpStatus.CREATED || response?.status === HttpStatus.OK) {
            reset();
            setReponseText(true);
        }
    }

    return <div className="flex min-h-screen flex-col justify-center">
        <div className="w-1/4 mx-auto my-6">
            <div className="text-3xl font-bold text-center my-4">E-Exam</div>
            <Card className="px-4 py-10">
                <div className="font-extrabold text-xl text-center">Inscription</div>
                {
                    reponseText && <div className="border rounded bg-gray-100 p-2">
                        <div  className=" text-right">
                            <CloseCircleFilled onClick={() => setReponseText(false)} />
                        </div>
                        <div>
                        Votre compte est maintenant en attente de la validation de l'administrateur !
                        </div>
                    </div>
                }
                <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                    <Label className="mb-1">Nom :</Label>
                    <Controller
                        control={control}
                        name="nom"
                        render={({ field: { value, onChange } }) => (
                            <Input value={value} onChange={onChange} className={`${errors?.nom && 'border border-red-500 text-red-500 rounded'}`} />
                        )}
                    />
                    { errors?.nom && <div className="text-xs w-full text-red-500 text-left">{ errors?.nom.message }</div> }
                    <Label className="mb-1 mt-4">Matricule :</Label>
                    <Controller
                        control={control}
                        name="matricule"
                        render={({ field: { value, onChange } }) => (
                            <Input value={value} onChange={onChange} className={`${errors?.matricule && 'border border-red-500 text-red-500 rounded'}`} />
                        )}
                    />
                    { errors?.matricule && <div className="text-xs w-full text-red-500 text-left">{ errors?.matricule.message }</div> }
                    <Label className="mb-1 mt-4">Groupe :</Label>
                    <Controller
                        control={control}
                        name="groupe"
                        render={({ field: { value, onChange } }) => (
                            <Input value={value} onChange={onChange} className={`${errors?.groupe && 'border border-red-500 text-red-500 rounded'}`} />
                        )}
                    />
                    { errors?.groupe && <div className="text-xs w-full text-red-500 text-left">{ errors?.groupe.message }</div> }
                    <Label className="mb-1 mt-4">Adresse mail :</Label>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (
                            <Input value={value} onChange={onChange} className={`${errors?.email && 'border border-red-500 text-red-500 rounded'}`} />
                        )}
                    />
                    { errors?.email && <div className="text-xs w-full text-red-500 text-left">{ errors?.email.message }</div> }
                    <Label className="mb-1 mt-4">Mot de passe :</Label>
                    <Controller
                        control={control}
                        name="motdepasse"
                        render={({ field: { value, onChange } }) => (
                            <Input value={value} onChange={onChange} className={`${errors?.motdepasse && 'border border-red-500 text-red-500 rounded'}`} />
                        )}
                    />
                    { errors?.motdepasse && <div className="text-xs w-full text-red-500 text-left">{ errors?.motdepasse.message }</div> }
                    <div className="flex justify-center mt-4">
                        <Button type="submit">S'inscrire</Button>
                    </div>
                </form>
                <Link to="/" className="w-max mx-auto">
                    <Button variant={'link'} className="w-max">Se connecter</Button>
                </Link>
            </Card>
        </div>
    </div>
}

export default SignupPage;