import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Bell, CalendarCheck, FileEdit, FileText, User, LogOut, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGetUserById } from "@/hooks/user/useGetUserById";

const navItems = [
  { path: "/teacher/home", label: "Accueil", icon: Home },
  { path: "/teacher/announce", label: "Annonces", icon: Bell },
  { path: "/teacher/test", label: "Tests", icon: CalendarCheck },
  { path: "/teacher/correction", label: "Corrections", icon: FileEdit },
  { path: "/teacher/result", label: "Résultats", icon: FileText },
];

const TeacherNavigation: React.FC = () => {
  const location = useLocation();
  const { logout, token } = useAuth();
  const { data: user, refetch } = useGetUserById(
    token ? JSON.parse(atob(token.split(".")[1])).id : "",
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="z-50 w-64 fixed top-0 left-0 h-screen bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/teacher/home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-custom/25">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-sidebar-foreground">E-exam</div>
            <div className="text-xs text-sidebar-foreground/50">Enseignant</div>
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

      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link to="/teacher/profile">
          <div className={`sidebar-link ${location.pathname === "/teacher/profile" ? "sidebar-link-active" : "sidebar-link-inactive"}`}>
            <User className="w-5 h-5" />
            <span className="truncate">{user?.email ?? "Profil"}</span>
          </div>
        </Link>
        <button onClick={() => logout()} className="sidebar-link sidebar-link-inactive w-full">
          <LogOut className="w-5 h-5" />
          <span>Déconnecter</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherNavigation;
