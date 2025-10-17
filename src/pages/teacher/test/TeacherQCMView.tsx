import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mock_optionsqcm, mock_questions } from "@/constants/mock";
import { OptionCreateInterface } from "@/interfaces/option.interface";
import { OptionAddValidation } from "@/validation/option.validation";
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TeacherQCMView: React.FC  = () => {
    const navigate = useNavigate();
    const question = mock_questions[0];
    const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<OptionCreateInterface>({
        resolver: yupResolver(OptionAddValidation)
    })

    useEffect(() => {
        setValue('id_question', 'd')
        setValue('est_correcte', false)
    }, [])

    const handleSubmit = async (data: OptionCreateInterface) => {
        console.log(data);
    }

    return <div className="pl-64 pr-6">
        <TeacherNavigation />
        <div className="my-6">
            <div className="">
                <div className="px-10">
                    <div className="flex justify-between items-center">
                        <div className="uppercase font-bold">Les options de la question QCM</div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button><Plus /> Nouvelle question</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto mr-16">
                                <div className="mb-2 text-gray-700 font-medium">Nouvelle question</div>
                                <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                                    <Label className="mb-1">Question :</Label>
                                    <Controller
                                        control={control}
                                        name="texte_option"
                                        render={({ field: { value, onChange } }) => (
                                            <Input value={value} onChange={onChange} className={`${errors?.texte_option && 'border border-red-500 text-red-500 rounded'}`} />
                                        )}
                                    />
                                    { errors?.texte_option && <div className="text-xs w-full text-red-500 text-left">{ errors?.texte_option.message }</div> }
                                    <div className="flex items-center gap-2 my-2">
                                        <input type="checkbox" id="est_correcte" onChange={(e: any) => console.log(e.target)} />
                                        <Label htmlFor="est_correcte" >Reponse correcte</Label>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <Button type="submit">Ajouter</Button>
                                    </div>
                                </form>
                            </PopoverContent>
                        </Popover>  
                    </div>
                    <div className="my-2">
                        {
                            question &&
                            <Card className="mb-2 px-4">
                                <div>
                                    <div className="flex justify-between">
                                        <div className="text-gray-600">Type: { question.type_question }</div>
                                        <div className="my-1 font-semibold">Note pour la question : { question.points } point(s)</div>
                                    </div>
                                    <div className="font-semibold">Question : { question.texte_question } </div>
                                    <div className="text-gray-700">Reponse correcte : { question.reponse_correcte }</div>
                                </div>
                            </Card>
                        }
                    </div>
                    <div className="px-10 my-4">
                        {
                            mock_optionsqcm.map((option: any, idex: any) => {
                                return <div className="flex justify-between items-center my-2 gap-4">
                                    <div className="flex gap-2">
                                        <div className={`${option.est_correcte ? "text-green-500" : "text-red-400"}`}>
                                            {
                                                option.est_correcte ? <CheckCircleOutlined /> : <CloseCircleOutlined /> 
                                            }
                                        </div>
                                        <div> { option.texte_option } </div>
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button size={'icon'} variant={'destructive'}><Trash /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Suppression d'une option</AlertDialogTitle>
                                            <AlertDialogDescription>
                                            Voulez-vous vraiment supprimer cette option ?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <Button variant={'destructive'}>Supprimer</Button>
                                        </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            })
                        }                        
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default TeacherQCMView;