import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import RoleGuard from "./RoleGuard";
import MainLayout from "../Layout/MainLayout";

import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOTP";
import SetNewPassword from "../Pages/Auth/SetNewPassword";
import Successful from "../Pages/Auth/Successful";

import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AdminClients from "../Pages/Admin/Clients/AdminClients";
import Approvals from "../Pages/Admin/Approvals/Approvals";
import Reports from "../Pages/Admin/Reports/Reports";
import RepDetails from "../Pages/Admin/Reports/RepDetails";
import UserManagement from "../Pages/Admin/UserManagement/UserManagement";
import Settings from "../Pages/Admin/Settings/Settings";
import Expenses from "../Pages/Admin/Expenses/Expenses";
import ImpersonateView from "../Pages/Admin/Clients/ImpersonateView";

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
import StatsReports from "../Pages/Sales-rep/StatsReports/StatsReports";
import UserExpenses from "../Pages/Sales-rep/ExpensesMileage/Expenses";

import ProductionHome from "../Pages/Production-Manager/ProductionHome/ProductionHome";
import JobScheduling from "../Pages/Production-Manager/JobScheduling/JobScheduling";
import JobOverview from "../Pages/Production-Manager/JobScheduling/JobOverview";
import ProductionReport from "../Pages/Production-Manager/ProductionReport/ProductionReport";
import ProductionSettings from "../Pages/Production-Manager/ProductionSettings/ProductionSettings";

import GlobalNoRoute from "../Pages/Common/GlobalNoRoute";

export const router = createBrowserRouter([
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
          { path: "stats-reports", element: <StatsReports /> },
          { path: "mileage-log", element: <UserExpenses /> },
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
          { path: "production-home", element: <ProductionHome /> },
          { path: "job-scheduling", element: <JobScheduling /> },
          { path: "job-scheduling/:id", element: <JobOverview /> },
          {
            path: "job-scheduling/:id/design-consultation",
            element: <DesignConsultation />,
          },
          { path: "production-settings", element: <ProductionSettings /> },
          { path: "production-report", element: <ProductionReport /> },
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
          { path: "dashboard", element: <Dashboard /> },
          { path: "clients", element: <AdminClients /> },
          { path: "add-client", element: <AddClient /> },
          { path: "job/:jobId", element: <JobDetailsPage /> },
          { path: "impersonate-view", element: <ImpersonateView /> },
          { path: "approvals-center", element: <Approvals /> },
          { path: "reports", element: <Reports /> },
          { path: "reports-details/:id", element: <RepDetails /> },
          { path: "expenses", element: <Expenses /> },
          { path: "user-management", element: <UserManagement /> },
          { path: "settings", element: <Settings /> },
          { path: "*", element: <GlobalNoRoute /> },
        ],
      },
    ],
  },

  { path: "*", element: <GlobalNoRoute /> },
]);
