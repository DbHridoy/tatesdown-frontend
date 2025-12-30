import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) return children ? children : <Outlet />;

  // if authenticated but user is not loaded yet, show a loader
  if (isAuthenticated && !user) return <div>Loading...</div>;

  // now safe to access user.role
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

};

export default PublicRoute;
