import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpStatus } from "@/constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useGetAnnonceByUserId } from "@/hooks/annonce/useGetAnnonceByUserId";
import { usePatchAnnonce } from "@/hooks/annonce/usePatchAnnonce";
import { useGetAllGroup } from "@/hooks/group/useGetAllGroup";
import { AnnounceEditInterface } from "@/interfaces/announce.interface";
import { EditAnnounceValidation } from "@/validation/announce.validation";
import { NotificationOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const TeacherAnnounceEdit: React.FC  = () => {
    const req = useParams();
    const Id = req.id;
    const { token } = useAuth();
    const { data: annonce, refetch } = useGetAnnonceByUserId(Id ? Number(Id) : 0)
    const { data: groupes } = useGetAllGroup();
    const { mutateAsync: modifierAnnonce } = usePatchAnnonce({action() {
        refetch();
    },})    
    const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<AnnounceEditInterface>({
        resolver: yupResolver(EditAnnounceValidation)
    });
    const navigate = useNavigate();

    useEffect(() => {
        setValue('date_creation', String(new Date()))
        setValue('id_annonce', Id ? String(Id) : "")
        setValue('id_createur', token ? token.split("/")[0] : "")
    }, [])

    const handleSubmit = async (data: AnnounceEditInterface) => {
        const response = await modifierAnnonce(data);
        if(response?.status === HttpStatus.OK) {
            navigate("/teacher/announce")
        }
    }
    
    return <div className="pl-64 pr-[4%] py-6 min-h-screen flex flex-col justify-center">
        <TeacherNavigation />
        <div>
        <div className="w-1/3 mx-auto">
            <Card className="px-4 py-10">
                <div>
                    <div className="text-xl uppercase font-bold text-center mb-4"><NotificationOutlined /> Modifier une annonce</div>
                    <form onSubmit={submit(handleSubmit)} className="w-64 mx-auto">
                        <Label className="mb-1">Groupe :</Label>
                        <Controller
                            control={control}
                            name="id_groupe"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value} onChange={onChange} className={`${errors?.id_groupe && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.id_groupe && <div className="text-xs w-full text-red-500 text-left">{ errors?.id_groupe.message }</div> }
                        <Label className="mb-1 mt-4">Description :</Label>
                        <Controller
                            control={control}
                            name="texte_annonce"
                            render={({ field: { value, onChange } }) => (
                                <Input value={value} onChange={onChange} className={`${errors?.texte_annonce && 'border border-red-500 text-red-500 rounded'}`} />
                            )}
                        />
                        { errors?.texte_annonce && <div className="text-xs w-full text-red-500 text-left">{ errors?.texte_annonce.message }</div> }
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

export default TeacherAnnounceEdit;