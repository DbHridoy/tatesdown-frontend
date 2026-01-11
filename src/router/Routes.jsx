import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import RoleGuard from "./RoleGuard";
import MainLayout from "../Layout/MainLayout";

// Auth Pages
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOTP";
import SetNewPassword from "../Pages/Auth/SetNewPassword";
import Successful from "../Pages/Auth/Successful";

// Admin Pages
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AdminClients from "../Pages/Admin/Clients/AdminClients";
import Approvals from "../Pages/Admin/Approvals/Approvals";
import Reports from "../Pages/Admin/Reports/Reports";
import RepDetails from "../Pages/Admin/Reports/RepDetails";
import UserManagement from "../Pages/Admin/UserManagement/UserManagement";
import Parameters from "../Pages/Admin/Params/Parameters";

// Sales Rep Pages
import Home from "../Pages/Sales-rep/Home/Home";
import Clients from "../Pages/Sales-rep/Clients/Clients";
import ClientDetails from "../Pages/Sales-rep/Clients/ClientDetails";
import AddCallLog from "../Pages/Sales-rep/Clients/AddCallLog";
import AddClient from "../Pages/Sales-rep/Clients/AddClient";
import Quotes from "../Pages/Sales-rep/Quotes/Quote";
import AddNewQuote from "../Pages/Sales-rep/Quotes/AddNewQuote";
import QuoteDetails from "../Pages/Sales-rep/Quotes/QuoteDetails";
import Jobs from "../Pages/Sales-rep/Jobs/Jobs";
import JobDetailsPage from "../Pages/Sales-rep/Jobs/JobDetailsPage";
import AddNewJob from "../Pages/Sales-rep/Jobs/AddNewJob";
import DesignConsultation from "../Pages/Sales-rep/Jobs/DesignConsultation";
import UserExpenses from "../Pages/Sales-rep/ExpensesMileage/Expenses";

// Production Manager Pages
import ProductionHome from "../Pages/Production-Manager/ProductionHome/ProductionHome";
import JobScheduling from "../Pages/Production-Manager/JobScheduling/JobScheduling";
import JobOverview from "../Pages/Production-Manager/JobScheduling/JobOverview";
import ProductionSettings from "../Pages/Common/ProductionSettings";

// Common
import GlobalNoRoute from "../Pages/Common/GlobalNoRoute";
import Settings from "../Pages/Common/ProductionSettings";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgetPassword /> },
      { path: "verify-otp", element: <VerifyOtp /> },
      { path: "set-password", element: <SetNewPassword /> },
      { path: "successful", element: <Successful /> },
    ],
  },

  // Sales Rep Routes
  {
    path: "/sales-rep",
    element: <RoleGuard allowedRole="Sales Rep" />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          { path: "home", element: <Home /> },
          {
            path: "clients",
            children: [
              { index: true, element: <Clients /> },
              { path: ":clientId", element: <ClientDetails /> },
            ],
          },
          { path: "add-call-log", element: <AddCallLog /> },
          { path: "add-client", element: <AddClient /> },
          { path: "quotes", element: <Quotes /> },
          { path: "add-new-quote", element: <AddNewQuote /> },
          { path: "quotes/:quoteId", element: <QuoteDetails /> },
          { path: "jobs", element: <Jobs /> },
          { path: "add-job", element: <AddNewJob /> },
          { path: "jobs/:jobId", element: <JobDetailsPage /> },
          {
            path: "jobs/:jobId/design-consultation",
            element: <DesignConsultation />,
          },
          { path: "mileage-log", element: <UserExpenses /> },
          { path: "settings", element: <Settings /> },
          { path: "*", element: <GlobalNoRoute /> },
        ],
      },
    ],
  },

  // Production Manager Routes
  {
    path: "/production-manager",
    element: <RoleGuard allowedRole="Production Manager" />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          { path: "home", element: <ProductionHome /> }, // matches menuConfig
          { path: "job-scheduling", element: <JobScheduling /> },
          { path: "job-scheduling/:id", element: <JobOverview /> },
          { path: "settings", element: <ProductionSettings /> }, // matches menuConfig
          { path: "*", element: <GlobalNoRoute /> },
        ],
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <RoleGuard allowedRole="Admin" />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "clients", element: <AdminClients /> },
          { path: "approvals-center", element: <Approvals /> },
          { path: "reports", element: <Reports /> },
          { path: "reports-details/:id", element: <RepDetails /> },
          { path: "user-management", element: <UserManagement /> },
          { path: "parameters", element: <Parameters /> }, // I assume this is Parameters page
          { path: "settings", element: <Settings /> },
          { path: "*", element: <GlobalNoRoute /> },
        ],
      },
    ],
  },

  // Fallback
  { path: "*", element: <GlobalNoRoute /> },
]);
