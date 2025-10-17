import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditGroupInterface } from "@/interfaces/groupe.interface";
import { EditGroupValidation } from "@/validation/group.validation";
import { BookOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

const AdminGroupeEdit: React.FC  = () => {
    const req = useParams();
    const Id = req.id;
    const { handleSubmit: submit, formState: { errors }, control } = useForm<EditGroupInterface>({
        resolver: yupResolver(EditGroupValidation)
    })

    const handleSubmit = async (data: EditGroupInterface) => {
        console.log(data);
    }
    
    return <div className="pl-64 pr-[4%] py-6 min-h-screen flex flex-col justify-center">
        <AdminNavigation />
        <div>
        <div className="w-1/3 mx-auto">
            <Card className="px-4 py-10">
                <div>
                    <div className="text-xl uppercase font-bold text-center mb-4"><BookOutlined /> Modifier un groupe</div>
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
                        <Label className="mb-1 mt-4">Description :</Label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value} onChange={onChange} className={`${errors?.description && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.description && <div className="text-xs w-full text-red-500 text-left">{ errors?.description.message }</div> }
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

export default AdminGroupeEdit;