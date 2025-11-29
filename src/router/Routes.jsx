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
            path: "/approvals-center",
            element: <Approvals />
          },
             {
            path: "/reports-deductions",
            element: <ReportsDeductions/>,
          },
          {
            path:"/expenses",
            element:<Expenses/>
          },
          {
            path:'/user-management',
            element:<UserManagement/>
          },
             {
            path:'/settings',
            element:<Settings/>
          }
        ],
      },
    ],
  },
]);
