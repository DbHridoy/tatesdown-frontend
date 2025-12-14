import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleGuard = ({ allowedRole }) => {
  const role = useSelector((state) => state.auth.user?.role);

  if (role !== allowedRole) {
    // Redirect to their own homepage
    if (role === "admin") return <Navigate to="/s/admin/dashboard" replace />;
    if (role === "sales-rep")
      return <Navigate to="/s/sales-rep/home" replace />;
    if (role === "production-manager")
      return <Navigate to="/s/production-manager/production-home" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
