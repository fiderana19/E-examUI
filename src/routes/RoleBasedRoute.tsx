import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

interface RoleBasedRouteProps {
  allowedRoles: string[];
}
const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const { token, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const decodedToken = token ? token.split("/")[1] : "";

  if (allowedRoles.includes(decodedToken)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default RoleBasedRoute;
