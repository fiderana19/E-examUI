import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Users, Bell, Clock, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { path: "/admin/home", label: "Accueil", icon: Home },
  { path: "/admin/groupe", label: "Groupes", icon: BookOpen },
  { path: "/admin/account", label: "Comptes", icon: Users },
  { path: "/admin/result", label: "Publications", icon: Bell },
  { path: "/admin/history", label: "Historique", icon: Clock },
];

const AdminNavigation: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="z-50 w-64 fixed top-0 left-0 h-screen bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/admin/home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-sidebar-foreground">E-exam</div>
            <div className="text-xs text-sidebar-foreground/50">Administrateur</div>
          </div>
        </Link>
      </div>

      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`sidebar-link ${isActive ? "sidebar-link-active" : "sidebar-link-inactive"}`}>
                <Icon className={`w-5 h-5 ${isActive ? "text-primary-custom" : ""}`} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button onClick={() => logout()} className="sidebar-link sidebar-link-inactive w-full">
          <LogOut className="w-5 h-5" />
          <span>Déconnecter</span>
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
