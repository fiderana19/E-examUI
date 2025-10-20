import AdminNavigation from "@/components/Navigation/AdminNavigation";
import React from "react";

const AdminHome: React.FC = () => {
  return (
    <div className="pl-64 pr-[4%] min-h-screen flex flex-col justify-center">
      <AdminNavigation />
      <div>
        <div className="text-3xl uppercase font-bold">
          Bienvenue sur l'espace d'administration de E-exam !
        </div>
        <div className="text-xl text-gray-600 mt-3">
          Les groupes et les comptes des utilisateurs sont administrés dans cet
          espace.
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
