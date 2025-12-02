import { Navigate} from "react-router-dom";

const PrivateRoute = () => {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/login" replace />;

  // Redirect to role-specific homepage
  switch (role) {
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

export default PrivateRoute;
