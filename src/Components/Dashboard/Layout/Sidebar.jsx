import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { IoNewspaper } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { CiHome } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdAutoGraph } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import brandlogo from "../../../assets/Logo.svg";

const menuConfig = {
  admin: [
    { icon: <MdDashboard className="w-5 h-5" />, label: "Dashboard", Link: "/s/admin/dashboard" },
    { icon: <PiUsers className="w-5 h-5" />, label: "Management", Link: "/s/admin/management" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Approvals Center", Link: "/s/admin/approvals-center" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Reports Deductions", Link: "/s/admin/reports-deductions" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Expenses", Link: "/s/admin/expenses" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "User Management", Link: "/s/admin/user-management" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Settings", Link: "/s/admin/settings" },
  ],

  "production-manager": [
    { icon: <CiHome className="w-5 h-5" />, label: "Home", Link: "/s/production-manager/production-home" },
    { icon: <IoBagHandleOutline className="w-5 h-5" />, label: "Job Scheduling", Link: "/s/production-manager/job-scheduling" },
    { icon: <MdAutoGraph className="w-5 h-5" />, label: "Reports", Link: "/s/production-manager/production-report" },
    { icon: <CiSettings className="w-5 h-5" />, label: "Settings", Link: "/s/production-manager/production-settings" },
  ],

  "sales-rep": [
    { icon: <MdDashboard className="w-5 h-5" />, label: "Home", Link: "/s/sales-rep/home" },
    { icon: <PiUsers className="w-5 h-5" />, label: "Clients / Leads", Link: "/s/sales-rep/clients" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Quotes", Link: "/s/sales-rep/quotes" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Jobs", Link: "/s/sales-rep/jobs" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Design Consultation", Link: "/s/sales-rep/design-consultation" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Stats / Reports", Link: "/s/sales-rep/stats-reports" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Expenses", Link: "/s/sales-rep/expense" },
  ],
};

const Sidebar = ({ activeLabel, setActiveLabel }) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const menuItems = menuConfig[role];

  const handleLogout = () => navigate("/login");

  return (
    <div className="flex flex-col px-2 h-full">
      {/* Logo */}
      <div className="flex justify-center items-center py-4">
        <img src={brandlogo} alt="logo" className="w-20 h-20 object-contain" />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.Link}
            className={`flex items-center gap-3 px-5 py-2 cursor-pointer transition-all rounded-lg ${
              activeLabel === item.label
                ? "bg-[#007CCD] text-white font-semibold"
                : "text-black hover:bg-gray-100"
            }`}
            onClick={() => setActiveLabel(item.label)} // now works
          >
            {item.icon}
            <p>{item.label}</p>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-primarycolor text-white mb-4 w-full py-3 flex justify-center items-center cursor-pointer rounded-lg mt-4"
      >
        <FiLogOut className="text-xl" />
        <p className="ml-2">Log out</p>
      </button>
    </div>
  );
};

export default Sidebar;
