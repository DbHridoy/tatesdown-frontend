import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import brandlogo from "../../../assets/Logo.svg";
import { PiUsers } from "react-icons/pi";
import { IoNewspaper } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const SalesRepSidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Home");
  const [openDropdown, setOpenDropdown] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <MdDashboard className="w-5 h-5" />,
      label: "Home",
      Link: "/home",
    },
    {
      icon: <PiUsers className="w-5 h-5" />,
      label: "Clients / Leads",
      Link: "/clients",
    },
    {
      icon: <IoNewspaper className="w-5 h-5" />,
      label: "Quotes ",
      Link: "/quotes",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Jobs",
      Link: "/jobs",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Design Consultation",
      Link: "/design-consultation",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Stats / Reports",
      Link: "/stats-reports",
    },
    {
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      label: "Expenses",
      Link: "/expense",
    },
  ];

  // Filter the menu items based on the search term
  const filterMenuItems = (items) => {
    return items.filter((item) => {
      // If the item has subItems, filter them as well
      if (item.isDropdown && item.subItems) {
        const filteredSubItems = item.subItems.filter((subItem) =>
          subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // If a subItem matches the search term, we include the parent dropdown
        if (filteredSubItems.length > 0) {
          item.subItems = filteredSubItems;
          return true;
        }
      }

      // Filter the label of the item
      return item.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const filteredItems = filterMenuItems(menuItems);

  const handleLogout = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-col px-2">
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <img src={brandlogo} alt="logo" className="w-20 h-20 object-contain" />
      </div>

      {/* Menu items */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
        {filteredItems.map((item) => (
          <div key={item.label}>
            <div
              className={`flex justify-between items-center px-5 py-2 my-5 cursor-pointer transition-all  ${
                active === item.label
                  ? "bg-[#007CCD] text-white font-semibold"
                  : "text-black"
              }`}
              onClick={() =>
                item.isDropdown
                  ? setOpenDropdown(
                      openDropdown === item.label ? "" : item.label
                    )
                  : setActive(item.label)
              }
            >
              <Link to={item.Link} className="flex items-center w-full gap-3">
                {item.icon}
                <p>{item.label}</p>
                {item.isDropdown && (
                  <BiChevronDown
                    className={`${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
            </div>
            {item.isDropdown && openDropdown === item.label && (
              <div className="flex flex-col pl-8">
                {item.subItems.map((subItem) => (
                  <Link to={subItem.Link} key={subItem.label}>
                    <div
                      className={`py-2 px-5 cursor-pointer my-5 bg-[#007CCD] transition-all rounded-lg ${
                        active === subItem.label
                          ? "bg-[#007CCD] text-black font-semibold"
                          : "text-white"
                      }`}
                      onClick={() => setActive(subItem.label)}
                    >
                      <p className="flex items-center gap-2">
                        {subItem.icon} {subItem.label}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

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
