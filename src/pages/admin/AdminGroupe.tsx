import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AddGroupInterface } from "@/interfaces/groupe.interface";
import { AddGroupValidation } from "@/validation/group.validation";
import { BookOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit2, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AdminGroupe: React.FC  = () => {
    const navigate = useNavigate();
    const [selectedGroup, setSelectedGroup] = useState<string>('')
    const { handleSubmit: submit, formState: { errors }, control } = useForm<AddGroupInterface>({
      resolver: yupResolver(AddGroupValidation)
    })

    const handleSubmit = async (data: AddGroupInterface) => {
      console.log(data);
    }

    const deleteConfirm = async (id: string) => {
      console.log(id);
    }

    return <div className="pl-64 pr-[4%] py-6">
        <AdminNavigation />
        <div>
            <div className="flex justify-between items-center">
                <div className="text-xl uppercase font-bold">Les groupes</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button><Plus /> Nouveau groupe</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-6 mr-14">
                      <div className="mb-2 text-gray-700 font-medium"><BookOutlined /> Nouveau groupe</div>
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
                              <Button type="submit">Ajouter</Button>
                          </div>
                      </form>
                  </PopoverContent>
              </Popover>  
            </div>
            <table className=' min-w-full divide-y divide-gray-200 my-4'>
              <thead>
                <tr>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                  </tr>
                </thead> 
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> d </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                    <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                      <div className='flex justify-end gap-1'>
                        <Button onClick={() => navigate("/admin/groupe/edit")} variant={'outline'} size={'icon'}><Edit2 /></Button>
                        <AlertDialog>
                            <AlertDialogTrigger>
                              <Button onClick={() => setSelectedGroup("ito")} variant={'destructive'} size={'icon'}><Trash /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Suppression du groupe</AlertDialogTitle>
                                <AlertDialogDescription>
                                Voulez-vous vraiment supprimer ce groupe ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <Button variant={'destructive'}>Supprimer</Button>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default AdminGroupe;