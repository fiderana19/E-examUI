import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ClockCircleOutlined, CloseOutlined, HourglassOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { CalendarClock, Check, Edit, Filter, History, Plus, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherTest: React.FC  = () => {
    const navigate = useNavigate();

    return <div className="pl-64 pr-6">
        <TeacherNavigation />
        <div className="my-6">
            <div className="flex justify-between items-center mb-10">
                <div className="text-gray-800 text-xl font-bold flex items-center gap-2"><CalendarClock /> Vos tests</div>
                <div className="flex gap-2 items-center">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button><Filter /> Filtrer</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto mr-14">
                            <div className="mb-2 text-gray-700 font-medium">Fitrer par :</div>
                            <div className="w-40 text-left">
                            <Button className="w-full" variant={'ghost'}><CalendarClock /> Tous les tests</Button>
                            <Button className="w-full" variant={'ghost'}><HourglassOutlined /> En attente</Button>
                            <Button className="w-full" variant={'ghost'}><History /> En cours</Button>
                            <Button className="w-full" variant={'ghost'}><Check /> Terminé</Button>
                            </div>
                        </PopoverContent>
                    </Popover>  
                    <Button onClick={() => navigate("/teacher/test/create")}><Plus /> Nouveau test</Button>
                </div>
            </div>
            <div className="w-max mx-auto text-center text-gray-600 my-10 hidden">
                <CloseOutlined className="text-7xl" />
                <div className="mt-4 text-xl">Vous avez créé aucun test</div>
            </div>
            <div className="">
                <div className="shadow p-4 bg-white my-2">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg">Test de HTML</div>
                                <div className="border rounded-full px-2 bg-gray-400 text-white">
                                    <ClockCircleOutlined /> 45:00
                                </div>
                            </div>
                            <div className="font-bold text-gray-800">M1</div>
                            <div className="border rounded-full px-2 bg-yellow-200 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>En attente</div>
                            </div>
                            <div className="border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>En cours</div>
                            </div>
                            <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>Terminé</div>
                            </div>
                        </div>
                        <div className="flex justify-between my-1">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg text-gray-600">2/20 questions</div>
                            </div>
                            <div className="font-bold text-gray-800">Note maximum : 20</div>
                        </div>
                        <div className="text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, expedita quidem non sint esse perferendis ex exercitationem molestias cum</div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button ><History /> Lancer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Lancement d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Proceder au lancement du test ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <Button>Confirmer</Button>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button onClick={() => navigate("/teacher/test/edit")} variant={'secondary'}><Edit /> Modifier</Button>
                        <Button onClick={() => navigate("/teacher/test/view")} variant={'secondary'} ><QuestionCircleOutlined /> Voir les questions</Button>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant={'destructive'}><Trash /> Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Suppression d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Voulez-vous vraiment supprimer ce test ?
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
                <div className="shadow p-4 bg-white my-2">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg">Test de HTML</div>
                                <div className="border rounded-full px-2 bg-gray-400 text-white">
                                    <ClockCircleOutlined /> 45:00
                                </div>
                            </div>
                            <div className="font-bold text-gray-800">M1</div>
                            <div className="border hidden rounded-full px-2 bg-yellow-200 text-white items-center gap-2">
                                <HourglassOutlined /> <div>En attente</div>
                            </div>
                            <div className="border rounded-full px-2 bg-gray-400 text-white hidden items-center gap-2">
                                <HourglassOutlined /> <div>En cours</div>
                            </div>
                            <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>Terminé</div>
                            </div>
                        </div>
                        <div className="flex justify-between my-1">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg text-gray-600">2/20 questions</div>
                            </div>
                            <div className="font-bold text-gray-800">Note maximum : 20</div>
                        </div>
                        <div className="text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, expedita quidem non sint esse perferendis ex exercitationem molestias cum</div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button ><History /> Lancer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Lancement d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Proceder au lancement du test ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <Button>Confirmer</Button>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button variant={'secondary'}><Edit /> Modifier</Button>
                        <Button variant={'secondary'} ><QuestionCircleOutlined /> Voir les questions</Button>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant={'destructive'}><Trash /> Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Suppression d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Voulez-vous vraiment supprimer ce test ?
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
                <div className="shadow p-4 bg-white my-2">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg">Test de HTML</div>
                                <div className="border rounded-full px-2 bg-gray-400 text-white">
                                    <ClockCircleOutlined /> 45:00
                                </div>
                            </div>
                            <div className="font-bold text-gray-800">M1</div>
                            <div className="border rounded-full px-2 bg-yellow-200 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>En attente</div>
                            </div>
                            <div className="border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>En cours</div>
                            </div>
                            <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>Terminé</div>
                            </div>
                        </div>
                        <div className="flex justify-between my-1">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg text-gray-600">2/20 questions</div>
                            </div>
                            <div className="font-bold text-gray-800">Note maximum : 20</div>
                        </div>
                        <div className="text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, expedita quidem non sint esse perferendis ex exercitationem molestias cum</div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button ><History /> Lancer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Lancement d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Proceder au lancement du test ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <Button>Confirmer</Button>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button variant={'secondary'}><Edit /> Modifier</Button>
                        <Button variant={'secondary'} ><QuestionCircleOutlined /> Voir les questions</Button>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant={'destructive'}><Trash /> Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Suppression d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Voulez-vous vraiment supprimer ce test ?
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
                <div className="shadow p-4 bg-white my-2">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg">Test de HTML</div>
                                <div className="border rounded-full px-2 bg-gray-400 text-white">
                                    <ClockCircleOutlined /> 45:00
                                </div>
                            </div>
                            <div className="font-bold text-gray-800">M1</div>
                            <div className="border rounded-full px-2 bg-yellow-200 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>En attente</div>
                            </div>
                            <div className="border rounded-full px-2 bg-gray-400 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>En cours</div>
                            </div>
                            <div className="border rounded-full px-2 bg-green-400 text-white flex items-center gap-2">
                                <HourglassOutlined /> <div>Terminé</div>
                            </div>
                        </div>
                        <div className="flex justify-between my-1">
                            <div className="flex gap-4">
                                <div className="font-bold text-lg text-gray-600">2/20 questions</div>
                            </div>
                            <div className="font-bold text-gray-800">Note maximum : 20</div>
                        </div>
                        <div className="text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, expedita quidem non sint esse perferendis ex exercitationem molestias cum</div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button ><History /> Lancer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Lancement d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Proceder au lancement du test ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <Button>Confirmer</Button>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button variant={'secondary'}><Edit /> Modifier</Button>
                        <Button variant={'secondary'} ><QuestionCircleOutlined /> Voir les questions</Button>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant={'destructive'}><Trash /> Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Suppression d'un test</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Voulez-vous vraiment supprimer ce test ?
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
            </div>
        </div>
    </div>
}

export default TeacherTest;