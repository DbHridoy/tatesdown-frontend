import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { IoNewspaper } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import brandlogo from "../../../assets/Logo.svg";

const AdminSidebar = ({ activeLabel, setActiveLabel }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <MdDashboard className="w-5 h-5" />, label: "Dashboard", Link: "/s/admin/dashboard" },
    { icon: <PiUsers className="w-5 h-5" />, label: "Management", Link: "/s/admin/management" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Approvals Center", Link: "/s/admin/approvals-center" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Reports Deductions", Link: "/s/admin/reports-deductions" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Expenses", Link: "/s/admin/expenses" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "User Management", Link: "/s/admin/user-management" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Settings", Link: "/s/admin/settings" },
  ];

  const handleLogout = () => navigate("/login");

  return (
    <div className="flex flex-col px-2">
      {/* Logo */}
      <div className="flex justify-center items-center my-4">
        <img src={brandlogo} alt="logo" className="w-20 h-20 object-contain" />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-1">
            <Link
              to={item.Link}
              className={`flex items-center gap-3 px-5 py-2 cursor-pointer transition-all ${
                activeLabel === item.label
                  ? "bg-[#007CCD] text-white font-semibold"
                  : "text-black"
              }`}
              onClick={() => setActiveLabel(item.label)} // Update topbar label
            >
              {item.icon}
              <p>{item.label}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-primarycolor text-white w-full py-3 flex justify-center items-center cursor-pointer rounded-lg mt-4"
      >
        <FiLogOut className="text-xl" />
        <p className="ml-2">Log out</p>
      </button>
    </div>
  );
};

export default AdminSidebar;
