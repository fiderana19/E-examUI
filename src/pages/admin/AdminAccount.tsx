import AdminNavigation from "@/components/Navigation/AdminNavigation";
import {
  AlertDialog,
  AlertDialogAction,
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
import StatusBadge from "@/components/StatusBadge";
import { useGetAllUser } from "@/hooks/user/useGettAllUser";
import { useValidateUser } from "@/hooks/user/useValidateUser";
import { Loader2, Check, Filter, User, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFixation";

const AdminAccount: React.FC = () => {
  const { data: users, refetch, isLoading } = useGetAllUser();
  const { mutateAsync: validerUser, isPending: validateLoading } = useValidateUser({
    action() { refetch(); },
  });
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [searchRef, setSearchRef] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("Tout");

  useEffect(() => { refetch(); }, []);

  const validateConfirm = async () => {
    await validerUser(selectedAccount);
  };

  const roleLabels: Record<string, string> = {
    admin: "Admin",
    enseignant: "Enseignant",
    etudiant: "Étudiant",
  };

  let displayedUsers = users || [];
  if (filterStatus === "Validé") {
    displayedUsers = displayedUsers.filter((u: any) => u.est_valider);
  } else if (filterStatus === "Non valide") {
    displayedUsers = displayedUsers.filter((u: any) => !u.est_valider);
  }
  if (searchRef) {
    displayedUsers = displayedUsers.filter((u: any) =>
      u.matricule?.toLowerCase().includes(searchRef.toLowerCase())
    );
  }

  return (
    <div className="ml-64 min-h-screen bg-background">
      <AdminNavigation />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Les comptes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gérez et validez les comptes utilisateurs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Matricule..."
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4" /> {filterStatus}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44 p-2" align="end">
                <div className="space-y-1">
                  {["Tout", "Validé", "Non valide"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        filterStatus === s
                          ? "bg-primary-custom/10 text-primary-custom font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : !displayedUsers.length ? (
          <div className="text-center py-20">
            <User className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Aucun compte trouvé</h3>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Matricule</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rôle</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayedUsers.map((et: any, index: any) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{et.nom ?? ""}</td>
                    <td className="px-6 py-4 text-sm">{et.matricule ?? ""}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{et.email ?? ""}</td>
                    <td className="px-6 py-4 text-sm">{roleLabels[et.role] ?? et.role ?? ""}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={et.est_valider ? "Validé" : "Non valide"} />
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(et.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {!et.est_valider && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm">
                                <Check className="w-4 h-4" /> Valider
                              </Button>
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
                                <AlertDialogAction className="p-0">
                                  <Button onClick={() => validateConfirm()} variant="success" disabled={validateLoading}>
                                    {validateLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Valider
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAccount;
