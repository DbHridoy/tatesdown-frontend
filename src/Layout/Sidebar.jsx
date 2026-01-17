import { CiHome, CiSettings } from "react-icons/ci";
import { IoBagHandleOutline, IoNewspaper } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/authApi";
import { logout, selectUserRole } from "../redux/slice/authSlice";
import brandlogo from "../assets/Logo.svg";
import { FiLogOut } from "react-icons/fi";
import { userApi } from "../redux/api/userApi";

export const menuConfig = {
  "Sales Rep": [
    {
      icon: <MdDashboard className="w-5 h-5" />,
      label: "Home",
      Link: "/sales-rep/home",
    },
    {
      icon: <PiUsers className="w-5 h-5" />,
      label: "Clients",
      Link: "/sales-rep/clients",
    },
    {
      icon: <IoNewspaper className="w-5 h-5" />,
      label: "Quotes",
      Link: "/sales-rep/quotes",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Jobs",
      Link: "/sales-rep/jobs",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Reports",
      Link: "/sales-rep/reports",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Mileage Log",
      Link: "/sales-rep/mileage-log",
    },
    {
      icon: <CiSettings className="w-5 h-5" />,
      label: "Settings",
      Link: "/sales-rep/settings",
    },
  ],

  "Production Manager": [
    {
      icon: <CiHome className="w-5 h-5" />,
      label: "Home",
      Link: "/production-manager/home",
    },
    {
      icon: <IoBagHandleOutline className="w-5 h-5" />,
      label: "Jobs",
      Link: "/production-manager/jobs",
    },
    {
      icon: <IoBagHandleOutline className="w-5 h-5" />,
      label: "My Jobs",
      Link: "/production-manager/my-jobs",
    },
    {
      icon: <CiHome className="w-5 h-5" />,
      label: "Reports",
      Link: "/production-manager/reports",
    },
    {
      icon: <CiSettings className="w-5 h-5" />,
      label: "Settings",
      Link: "/production-manager/settings",
    },
  ],

  Admin: [
    {
      icon: <MdDashboard className="w-5 h-5" />,
      label: "Dashboard",
      Link: "/admin/dashboard",
    },
    {
      icon: <IoBagHandleOutline className="w-5 h-5" />,
      label: "Clients",
      Link: "/admin/clients",
    },
    {
      icon: <IoBagHandleOutline className="w-5 h-5" />,
      label: "Quotes",
      Link: "/admin/quotes",
    },
    {
      icon: <PiUsers className="w-5 h-5" />,
      label: "Jobs",
      Link: "/admin/jobs",
    },
    {
      icon: <IoNewspaper className="w-5 h-5" />,
      label: "Approvals Center",
      Link: "/admin/approvals-center",
    },
    // {
    //   icon: <IoNewspaper className="w-5 h-5" />,
    //   label: "Reports",
    //   Link: "/admin/reports",
    // },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "User Management",
      Link: "/admin/user-management",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Parameters",
      Link: "/admin/parameters",
    },
    {
      icon: <CiSettings className="w-5 h-5" />,
      label: "Settings",
      Link: "/admin/settings",
    },
  ],
};

const Sidebar = ({ activeLabel, setActiveLabel, onClose }) => {
  const role = useSelector(selectUserRole);
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();
  const menuItems = menuConfig[role];
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      // ignore backend error
    } finally {
      dispatch(logout());
      dispatch(userApi.util.resetApiState());
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex flex-col px-2 h-full">
      <div className="flex justify-center items-center py-4">
        <img src={brandlogo} alt="logo" className="w-20 h-20 object-contain" />
      </div>

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
            onClick={() => {
              setActiveLabel(item.label);
              if (onClose) onClose();
            }}
          >
            {item.icon}
            <p>{item.label}</p>
          </Link>
        ))}
      </div>

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
