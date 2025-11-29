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
import Home from "../UserPages/Home/Home";
import Clients from "../UserPages/ClientsLeads/Clients";
import Quotes from "../UserPages/Quotes/Quote";
import Jobs from "../UserPages/Jobs/Jobs";
import UserLayout from "../UserLayout/UserLayout";
import DesignConsultation from "../UserPages/DesignConsultation/DesignConsultation";
import StatsReports from "../UserPages/StatsReports/StatsReports";
import UserExpenses from "../UserPages/ExpensesMileage/Expenses";
import ClientDetails from "../UserPages/ClientsLeads/ClientDetails";
import AddCallLog from "../UserPages/ClientsLeads/AddCallLog";
import AddClient from "../UserPages/ClientsLeads/AddClient";
import AddNewQuote from "../UserPages/Quotes/AddNewQuote";
import QuoteDetails from "../UserPages/Quotes/QuoteDetails";
import AddNewJob from "../UserPages/Jobs/AddNewJob";
import JobsDetailsView from "../UserPages/Jobs/JobDetailsPage";
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
            path: "client-details",
            element: <ClientDetails />,
          },
          {
            path: "add-call-log",
            element: <AddCallLog />,
          },
          {
            path: "add-client",
            element: <AddClient />,
          },
          {
            path: "quotes",
            element: <Quotes />,
          },
          {
            path: "add-new-quote",
            element: <AddNewQuote />,
          },
          {
            path: "quote-details",
            element: <QuoteDetails />,
          },
          {
            path: "jobs",
            element: <Jobs />,
          },
          {
            path: "add-new-job",
            element: <AddNewJob />,
          },
          {
            path: "jobs-details",
            element: <JobsDetailsView />,
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
