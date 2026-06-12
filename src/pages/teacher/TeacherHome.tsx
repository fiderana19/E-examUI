import TeacherNavigation from "@/components/Navigation/TeacherNavigation";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useGetAnnonceByUserId } from "@/hooks/annonce/useGetAnnonceByUserId";
import { Bell, GraduationCap, Loader2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateFixation";

const TeacherHome: React.FC = () => {
  const { token } = useAuth();
  const { data: annonces, isLoading } = useGetAnnonceByUserId(
    token ? JSON.parse(atob(token.split(".")[1])).id : 0,
  );

  return (
    <div className="ml-64 min-h-screen bg-background">
      <TeacherNavigation />
      <div className="p-8">

        <div className="gradient-primary rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Bienvenue sur votre espace
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Créez et gérez vos examens en ligne, corrigez les copies et publiez les résultats.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/teacher/test/create">
                <div className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary-custom/10 text-primary-custom flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-1">Nouveau test</h3>
                  <p className="text-sm text-muted-foreground">Créer un examen pour vos étudiants</p>
                </div>
              </Link>
              <Link to="/teacher/correction">
                <div className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-1">Corrections</h3>
                  <p className="text-sm text-muted-foreground">Corriger les copies soumises</p>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Dernières annonces</h2>
            <Card className="p-5">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : annonces?.data?.length ? (
                <div className="space-y-4">
                  {annonces.data.slice(0, 3).map((announce: any, index: any) => (
                    <div key={index} className="pb-3 border-b border-border last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-muted-foreground">{formatDate(announce?.creation_annonce)}</span>
                        <span className="text-xs font-medium text-primary-custom">{announce?.group?.nom_groupe ?? ""}</span>
                      </div>
                      <p className="text-sm font-medium">{announce?.titre_annonce ?? ""}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{announce?.texte_annonce ?? ""}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Aucune annonce pour le moment</p>
              )}
              <Link to="/teacher/announce">
                <p className="text-sm text-primary-custom font-medium mt-3 text-center hover:underline">
                  Voir toutes les annonces
                </p>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
