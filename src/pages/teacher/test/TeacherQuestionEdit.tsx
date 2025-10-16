import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionEditInterface } from "@/interfaces/question.interface";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { QuestionEditValidation } from "@/validation/question.validation";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const TeacherQuestionEdit: React.FC  = () => {
    const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<QuestionEditInterface>({
        resolver: yupResolver(QuestionEditValidation)
    })

    useEffect(() => {
        setValue('id_question', 'd')
        setValue('id_test', 'd')
        setValue('id_utilisateur', 'd')
    }, [])

    const handleSubmit = async (data: QuestionEditInterface) => {
        console.log(data);
    }
    
    return <div className="pl-64 pr-[4%] py-10 flex flex-col justify-center">
        <TeacherNavigation />
        <div>
        <div className="w-1/3 mx-auto">
            <Card className="px-4 py-10">
                <div>
                    <div className="text-xl uppercase font-bold text-center mb-4 flex items-center gap-2"><QuestionCircleOutlined /> Modifier une question</div>
                                <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                                    <Label className="mb-1">Question :</Label>
                                    <Controller
                                        control={control}
                                        name="texte_question"
                                        render={({ field: { value, onChange } }) => (
                                            <Input value={value} onChange={onChange} className={`${errors?.texte_question && 'border border-red-500 text-red-500 rounded'}`} />
                                        )}
                                    />
                                    { errors?.texte_question && <div className="text-xs w-full text-red-500 text-left">{ errors?.texte_question.message }</div> }
                                    <Label className="mb-1 mt-4">Type :</Label>
                                    <Controller
                                        control={control}
                                        name="type_question"
                                        render={({ field: { value, onChange } }) => (
                                            <Input value={value} onChange={onChange} className={`${errors?.type_question && 'border border-red-500 text-red-500 rounded'}`} />
                                        )}
                                    />
                                    { errors?.type_question && <div className="text-xs w-full text-red-500 text-left">{ errors?.type_question.message }</div> }
                                    <Label className="mb-1 mt-4">Reponse correcte :</Label>
                                    <Controller
                                        control={control}
                                        name="response_correcte"
                                        render={({ field: { value, onChange } }) => (
                                            <Input value={value} onChange={onChange} className={`${errors?.response_correcte && 'border border-red-500 text-red-500 rounded'}`} />
                                        )}
                                    />
                                    { errors?.response_correcte && <div className="text-xs w-full text-red-500 text-left">{ errors?.response_correcte.message }</div> }
                                    <Label className="mb-1 mt-4">Points attribués :</Label>
                                    <Controller
                                        control={control}
                                        name="points"
                                        render={({ field: { value, onChange } }) => (
                                            <Input value={value ? Number(value) : 0} onChange={onChange} onKeyPress={handleNumberKeyPress} className={`${errors?.points && 'border border-red-500 text-red-500 rounded'}`} />
                                        )}
                                    />
                                    { errors?.points && <div className="text-xs w-full text-red-500 text-left">{ errors?.points.message }</div> }
                                    <div className="flex justify-center mt-4">
                                        <Button type="submit">Modifier</Button>
                                    </div>
                                </form>
                </div>
            </Card>
        </div>
        </div>
    </div>
}

export default TeacherQuestionEdit;