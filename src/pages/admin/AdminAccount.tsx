import AdminNavigation from "@/components/Navigation/AdminNavigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetAllUser } from "@/hooks/user/useGettAllUser";
import { useValidateUser } from "@/hooks/user/useValidateUser";
import { CloseOutlined } from "@ant-design/icons";
import { Check, Filter, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFixation";

const AdminAccount: React.FC = () => {
  const { data: users, refetch } = useGetAllUser();
  const { mutateAsync: validerUser } = useValidateUser({
    action() {
      refetch();
    },
  });
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [searchRef, setSearchRef] = useState<string>("");
  const [filtereds, setFiltereds] = useState<any[]>([]);
  const [filterText, setFilterText] = useState<string>("Tout");
  const [filterRef, setFilterRef] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, []);
  const validateConfirm = async () => {
    await validerUser(selectedAccount);
  };

  async function filterData(text: string, value: number) {
    setFilterRef(true);
    setFilterText(text);
    const acc = users.filter((accounts: any) => accounts.est_valider === value);
    setFiltereds(acc);
  }

  return (
    <div className="pl-64 pr-[4%] py-6">
      <AdminNavigation />
      <div>
        <div className="flex justify-between items-center">
          <div className="text-xl uppercase font-bold">Les comptes</div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Matricule..."
              onChange={(e) => setSearchRef(e.target.value)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <Filter />
                  {filterText}{" "}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto mr-14">
                <div className="mb-2 text-gray-700 font-medium">
                  Fitrer par :
                </div>
                <div className="w-40 text-left">
                  <Button
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => {
                      setFilterRef(false);
                      setFilterText("Tout");
                    }}
                  >
                    <User /> Tous les comptes
                  </Button>
                  <Button
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => filterData("Validé", 1)}
                  >
                    <Check /> Compte validé
                  </Button>
                  <Button
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => filterData("Non valide", 0)}
                  >
                    <CloseOutlined /> Compte non valide
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <table className=" min-w-full divide-y divide-gray-200 my-4">
          <thead>
            <tr>
              <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Matricule
              </th>
              <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Mail
              </th>
              <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="lg:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date de création
              </th>
              <th className="px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterRef && users
              ? filtereds.map((et: any, index: any) => {
                  if (searchRef && !et.matricule.includes(searchRef)) {
                    return null;
                  }
                  return (
                    <tr key={index}>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.nom}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.matricule}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.email}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.role}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {formatDate(et.created_at)}{" "}
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                        <div className="flex justify-end gap-1">
                          {et.est_valider === 0 && (
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Button
                                  onClick={() =>
                                    setSelectedAccount(et.id_utilisateur)
                                  }
                                  variant={"success"}
                                  size={"icon"}
                                >
                                  <Check />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Validation du compte
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Voulez-vous vraiment valider ce compte ?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <Button
                                    onClick={() => validateConfirm()}
                                    variant={"success"}
                                  >
                                    Valider
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              : users &&
                users.map((et: any, index: any) => {
                  if (searchRef && !et.matricule.includes(searchRef)) {
                    return null;
                  }
                  return (
                    <tr key={index}>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.nom}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.matricule}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.email}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {et.role}{" "}
                      </td>
                      <td className="lg:px-6 px-2 py-4 xl:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900">
                        {" "}
                        {formatDate(et.created_at)}{" "}
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                        <div className="flex justify-end gap-1">
                          {et.est_valider === 0 && (
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Button
                                  onClick={() =>
                                    setSelectedAccount(et.id_utilisateur)
                                  }
                                  variant={"success"}
                                  size={"icon"}
                                >
                                  <Check />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Validation du compte
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Voulez-vous vraiment valider ce compte ?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <Button
                                    onClick={() => validateConfirm()}
                                    variant={"success"}
                                  >
                                    Valider
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAccount;
