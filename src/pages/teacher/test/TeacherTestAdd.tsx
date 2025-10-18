import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useGetAllTestByTeacherId } from "@/hooks/test/useGetAllTestByTeacherId";
import { usePostTest } from "@/hooks/test/usePostTest";
import { TestCreateInterface } from "@/interfaces/test.interface";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { TestCreateValidation } from "@/validation/test.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarClock } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TeacherTestAdd: React.FC  = () => {
    const { token } = useAuth();
    const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<TestCreateInterface>({
        resolver: yupResolver(TestCreateValidation)
    });
    const { refetch } = useGetAllTestByTeacherId(token ? Number(token.split("/")[0]) : 0);
    const { mutateAsync: createTest } = usePostTest({action() {
        refetch();
    },})
    const navigate = useNavigate();

    useEffect(() => {
        setValue('id_utilisateur', token ? String(token.split("/")[0]) : "")
    }, [])

    const handleSubmit = async (data: TestCreateInterface) => {
        const response = await createTest(data);
        if(response?.status === HttpStatus.CREATED) {
            navigate("/teacher/test")
        }
    }
    
    return <div className="pl-64 pr-[4%] py-10 flex flex-col justify-center">
        <TeacherNavigation />
        <div>
        <div className="w-1/3 mx-auto">
            <Card className="px-4 py-10">
                <div>
                    <div className="text-xl uppercase font-bold text-center mb-4 flex items-center gap-2"><CalendarClock /> Ajouter un nouveau test</div>
                    <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                        <Label className="mb-1">Date de declenchement :</Label>
                        <Controller
                            control={control}
                            name="date_declenchement"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value} onChange={onChange} className={`${errors?.date_declenchement && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.date_declenchement && <div className="text-xs w-full text-red-500 text-left">{ errors?.date_declenchement.message }</div> }
                        <Label className="mb-1 mt-4">Titre :</Label>
                        <Controller
                            control={control}
                            name="titre"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value} onChange={onChange} className={`${errors?.titre && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.titre && <div className="text-xs w-full text-red-500 text-left">{ errors?.titre.message }</div> }
                        <Label className="mb-1 mt-4">Description :</Label>
                        <Controller
                            control={control}
                            name="description_test"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value} onChange={onChange} className={`${errors?.description_test && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.description_test && <div className="text-xs w-full text-red-500 text-left">{ errors?.description_test.message }</div> }
                        <Label className="mb-1 mt-4">Durée (minutes) :</Label>
                        <Controller
                            control={control}
                            name="dureee_minutes"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value ? Number(value) : 0} onKeyPress={handleNumberKeyPress} onChange={onChange} className={`${errors?.dureee_minutes && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.dureee_minutes && <div className="text-xs w-full text-red-500 text-left">{ errors?.dureee_minutes.message }</div> }
                        <Label className="mb-1 mt-4">Note maximum :</Label>
                        <Controller
                            control={control}
                            name="note_max"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value ? Number(value) : 0} onKeyPress={handleNumberKeyPress} onChange={onChange} className={`${errors?.note_max && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.note_max && <div className="text-xs w-full text-red-500 text-left">{ errors?.note_max.message }</div> }
                        <Label className="mb-1 mt-4">Nombre maximum de question :</Label>
                        <Controller
                            control={control}
                            name="max_questions"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value ? Number(value) : 0} onKeyPress={handleNumberKeyPress} onChange={onChange} className={`${errors?.max_questions && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.max_questions && <div className="text-xs w-full text-red-500 text-left">{ errors?.max_questions.message }</div> }
                        <div className="flex justify-center mt-4">
                            <Button type="submit">Ajouter</Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
        </div>
    </div>
}

export default TeacherTestAdd;