import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRole }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/s/admin/dashboard" replace />;
      case "sales-rep":
        return <Navigate to="/s/sales-rep/home" replace />;
      case "production-manager":
        return <Navigate to="/s/production-manager/production-home" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default RoleGuard;
