import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import PrivateRoute from "./PrivateRoute";
import Management from "../Pages/Management/Management";
import Approvals from "../Pages/Approvals/Approvals";
import ReportsDeductions from "../Pages/ReportsDeductions/ReportsDeductions";
import Expenses from "../Pages/Expenses/Expenses";
import UserManagement from "../Pages/UserManagement/UserManagement";
import Settings from "../Pages/Settings/Settings";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../UserPages/Home/Home";;
import Clients from "../UserPages/ClientsLeads/Clients";
import Quotes from "../UserPages/Quotes/Quote";
import Jobs from "../UserPages/Jobs/Jobs";
import UserLayout from "../UserLayout/UserLayout";
import DesignConsultation from "../UserPages/DesignConsultation/DesignConsultation";
import StatsReports from "../UserPages/StatsReports/StatsReports";
import UserExpenses from "../UserPages/ExpensesMileage/Expenses";
export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/management",
            element: <Management />,
          },
          {
            path: "/approvals-center ",
            element: <Approvals />,
          },
          {
            path: "/reports-deductions",
            element: <ReportsDeductions />,
          },
          {
            path: "/expenses",
            element: <Expenses />,
          },
          {
            path: "/user-management",
            element: <UserManagement />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "/",
        element: <UserLayout />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "clients",
            element: <Clients />,
          },
          {
            path: "quotes",
            element: <Quotes />,
          },
          {
            path: "jobs",
            element: <Jobs />,
          },
          {
            path: "design-consultation",
            element: <DesignConsultation />,
          },
          {
            path: "stats-reports",
            element: <StatsReports />,
          },
          {
            path: "expense",
            element: <UserExpenses />,
          },
        ],
      },
    ],
  },
]);
