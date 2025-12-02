import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import RoleGuard from "./RoleGuard";

import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgotPassword";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import SalesRepLayout from "../Layout/SalesRepLayout";
import Home from "../Pages/Sales-rep/Home/Home";
import GlobalNoRoute from "../Pages/Common/GlobalNoRoute";
import ProductionManagerLayout from "../Layout/ProductionManagerLayout";
import ProductionHome from "../Pages/Production-Manager/ProductionHome/ProductionHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgetPassword /> },
    ],
  },
  {
    path: "/s",
    element: <PrivateRoute />, // Redirect based on role
  },
  {
    path: "/s/admin",
    element: <RoleGuard allowedRole="admin" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "*", element: <GlobalNoRoute /> },
        ],
      },
    ],
  },
  {
    path: "/s/sales-rep",
    element: <RoleGuard allowedRole="sales-rep" />,
    children: [
      {
        element: <SalesRepLayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "*", element: <GlobalNoRoute /> },
        ],
      },
    ],
  },
  {
    path: "/s/production-manager",
    element: <RoleGuard allowedRole="production-manager" />,
    children: [
      {
        element: <ProductionManagerLayout />,
        children: [
          { path: "production-home", element: <ProductionHome /> },
          { path: "*", element: <GlobalNoRoute /> },
        ],
      },
    ],
  },
  { path: "*", element: <GlobalNoRoute /> },
]);
