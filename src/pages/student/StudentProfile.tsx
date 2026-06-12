import StudentNavigation from "@/components/Navigation/StudentNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useGetUserById } from "@/hooks/user/useGetUserById";
import { Loader2, User, Mail, Hash, Users, LogOut } from "lucide-react";
import React from "react";

const StudentProfile: React.FC = () => {
  const { logout, token } = useAuth();
  const { data: user, isLoading } = useGetUserById(
    token ? JSON.parse(atob(token.split(".")[1])).id : "",
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <StudentNavigation />
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-8">Profil</h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-custom" />
          </div>
        ) : user ? (
          <Card className="border-border overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-8 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">{user.nom ?? ""}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Nom</span>
                </div>
                <span className="text-sm font-medium">{user.nom ?? ""}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm">Matricule</span>
                </div>
                <span className="text-sm font-medium">{user.matricule ?? ""}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Groupe</span>
                </div>
                <span className="text-sm font-medium">{user.nom_groupe ?? ""}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Adresse mail</span>
                </div>
                <span className="text-sm font-medium">{user.email ?? ""}</span>
              </div>
              <div className="pt-4">
                <Button onClick={logout} variant="destructive" className="w-full">
                  <LogOut className="w-4 h-4" /> Se déconnecter
                </Button>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default StudentProfile;
