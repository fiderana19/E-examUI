import AdminNavigation from "@/components/Navigation/AdminNavigation";
import React from "react";
import { Shield, BookOpen, Users, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { title: "Groupes", description: "Gérer les groupes", icon: BookOpen, path: "/admin/groupe", color: "from-blue-500 to-cyan-500" },
  { title: "Comptes", description: "Valider les comptes", icon: Users, path: "/admin/account", color: "from-purple-500 to-pink-500" },
  { title: "Publications", description: "Publier des résultats", icon: Bell, path: "/admin/result", color: "from-amber-500 to-orange-500" },
  { title: "Historique", description: "Voir l'historique", icon: Shield, path: "/admin/history", color: "from-teal-500 to-emerald-500" },
];

const AdminHome: React.FC = () => {
  return (
    <div className="ml-64 min-h-screen bg-background">
      <AdminNavigation />
      <div className="p-8">
        <div className="gradient-primary rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Tableau de bord administrateur
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Bienvenue sur l'espace d'administration. Gérez les groupes, les comptes utilisateurs et les publications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path}>
                <div className="bg-card border border-border rounded-xl p-6 card-hover cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
