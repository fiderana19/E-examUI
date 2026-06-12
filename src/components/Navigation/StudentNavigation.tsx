import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { User, LogOut, GraduationCap, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGetUserById } from "@/hooks/user/useGetUserById";

const navItems = [
  { path: "/student/home", label: "Accueil" },
  { path: "/student/announce", label: "Annonces" },
  { path: "/student/test", label: "Tests" },
  { path: "/student/result", label: "Résultats" },
];

const StudentNavigation: React.FC = () => {
  const { logout, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, refetch } = useGetUserById(
    token ? JSON.parse(atob(token.split(".")[1])).id : "",
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="z-40 fixed w-full top-0 left-0 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/student/home" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-md shadow-primary-custom/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">E-exam</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary-custom/10 text-primary-custom"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}>
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <div className="w-6 h-6 rounded-full bg-primary-custom/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary-custom" />
                </div>
                <span className="hidden sm:inline text-sm max-w-[120px] truncate">{user?.email}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 mr-4" align="end">
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b border-border mb-1">
                Menu
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => navigate("/student/profile")} className="sidebar-link sidebar-link-inactive">
                  <User className="w-4 h-4" />
                  Profil
                </button>
                <button onClick={() => logout()} className="sidebar-link sidebar-link-inactive text-destructive">
                  <LogOut className="w-4 h-4" />
                  Déconnecter
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default StudentNavigation;
