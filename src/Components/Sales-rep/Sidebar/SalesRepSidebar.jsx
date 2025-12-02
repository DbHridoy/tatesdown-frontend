import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { IoNewspaper } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import brandlogo from "../../../assets/Logo.svg";

const SalesRepSidebar = () => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();

  const menuItems = [
    { icon: <MdDashboard className="w-5 h-5" />, label: "Home", Link: "/s/sales-rep/home" },
    { icon: <PiUsers className="w-5 h-5" />, label: "Clients / Leads", Link: "/s/sales-rep/clients" },
    { icon: <IoNewspaper className="w-5 h-5" />, label: "Quotes", Link: "/s/sales-rep/quotes" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Jobs", Link: "/s/sales-rep/jobs" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Design Consultation", Link: "/s/sales-rep/design-consultation" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Stats / Reports", Link: "/s/sales-rep/stats-reports" },
    { icon: <RiMoneyDollarCircleLine className="w-5 h-5" />, label: "Expenses", Link: "/s/sales-rep/expense" },
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
                active === item.label ? "bg-[#007CCD] text-white font-semibold" : "text-black"
              }`}
              onClick={() => setActive(item.label)}
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

export default SalesRepSidebar;
