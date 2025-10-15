import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CloseOutlined } from "@ant-design/icons";
import { Edit, Plus, Trash } from "lucide-react";
import React from "react";

const TeacherAnnounce: React.FC  = () => {

    return <div className="pl-64 pr-6">
        <TeacherNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center">
                <div className="text-gray-800 text-3xl font-medium mb-10">Vos annonces</div>
                <div className="flex gap-2 items-center">
                    <Input className="w-60" placeholder="Fitrer..." />
                    <Button><Plus /> Nouvelle annonce</Button>
                </div>
            </div>
            <div className="w-max mx-auto text-center text-gray-600 my-10 hidden">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Vous avez fait aucune annonce </div>
            </div>
            <div className="">
                <Card className="mb-2">
                    <div className="px-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                            <div className="font-medium">M1</div>
                        </div>
                        <blockquote className="border-l-2 pl-6 italic">
                            Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                            Bonne chance !
                        </blockquote>
                        <div className="flex justify-end mt-2 gap-2">
                            <Button><Edit /> Modifier</Button>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button variant={'destructive'}><Trash /> Supprimer</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Suppression d'une annonce</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    Voulez-vous vraiment supprimer l'annonce ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <Button variant={'destructive'}>Supprimer</Button>
                                </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </Card>
                <Card className="mb-2">
                    <div className="px-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-gray-600 mb-1">2025-10-17 16:00</div>
                            <div className="font-medium">M1</div>
                        </div>
                        <blockquote className="border-l-2 pl-6 italic">
                            Un examen HTML de 45 minutes aura lieu ce samedi a 14h sur la plateforme.
                            Bonne chance !
                        </blockquote>
                        <div className="flex justify-end mt-2 gap-2">
                            <Button><Edit /> Modifier</Button>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button variant={'destructive'}><Trash /> Supprimer</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Suppression d'une annonce</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    Voulez-vous vraiment supprimer l'annonce ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <Button variant={'destructive'}>Supprimer</Button>
                                </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
}

export default TeacherAnnounce;