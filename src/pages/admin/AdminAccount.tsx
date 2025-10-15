import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CloseOutlined } from "@ant-design/icons";
import { Check, Edit2, Filter, Trash, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAccount: React.FC  = () => {
    const navigate = useNavigate();
    const [selectedAccount, setSelectedAccount] = useState<string>('')

    const deleteConfirm = async (id: string) => {
      console.log(id);
    }

    return <div className="pl-64 pr-[4%] py-6">
        <AdminNavigation />
        <div>
            <div className="flex justify-between items-center">
                <div className="text-xl uppercase font-bold">Les comptes</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Saisir le nom..." />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button><Filter /> Filtrer</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto mr-14">
                        <div className="mb-2 text-gray-700 font-medium">Fitrer par :</div>
                        <div className="w-40 text-left">
                          <Button className="w-full" variant={'ghost'}><User /> Tous les comptes</Button>
                          <Button className="w-full" variant={'ghost'}><Check /> Compte validé</Button>
                          <Button className="w-full" variant={'ghost'}><CloseOutlined /> Compte non valide</Button>
                        </div>
                    </PopoverContent>
                  </Popover>  
                </div>
            </div>
            <table className=' min-w-full divide-y divide-gray-200 my-4'>
              <thead>
                <tr>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Matricule</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Mail</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                    <th className='lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date de création</th>
                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                  </tr>
                </thead> 
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> d </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                    <td className='lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> f </td>
                    <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                      <div className='flex justify-end gap-1'>
                        <AlertDialog>
                            <AlertDialogTrigger>
                              <Button onClick={() => setSelectedAccount("ito")} variant={'success'} size={'icon'}><Check /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Validation du compte</AlertDialogTitle>
                                <AlertDialogDescription>
                                Voulez-vous vraiment valider ce compte ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <Button variant={'success'}>Valider</Button>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger>
                              <Button onClick={() => setSelectedAccount("ito")} variant={'destructive'} size={'icon'}><CloseOutlined /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Invalidation du compte</AlertDialogTitle>
                                <AlertDialogDescription>
                                Voulez-vous vraiment invalider ce compte ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <Button variant={'destructive'}>Invalider</Button>
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

export default AdminAccount;