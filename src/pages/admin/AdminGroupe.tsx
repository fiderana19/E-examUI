import AdminNavigation from "@/components/Navigation/AdminNavigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, Plus, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminGroupe: React.FC  = () => {
    const navigate = useNavigate();

    return <div className="pl-64 pr-[4%] py-6">
        <AdminNavigation />
        <div>
            <div className="flex justify-between items-center">
                <div className="text-xl uppercase font-bold">Les groupes</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button><Plus /> Nouveau groupe</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4 mr-14">
                      <div className="mb-2 text-gray-700 font-medium">Nouveau groupe</div>
                      <div className="w-52 flex flex-col gap-2">
                        hvefiuvh
                      </div>
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
                        <Button variant={'destructive'} size={'icon'}><Trash /></Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default AdminGroupe;