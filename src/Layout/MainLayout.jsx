import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FiPlus, FiEdit, FiTrash2, FiDownload } from "react-icons/fi";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import SalesRepTopbar from "./SalesRepTopbar";
import { useSelector } from "react-redux";
import { selectUserRole } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const role = useSelector(selectUserRole);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false); // FAB state

  const getDefaultLabel = (role) => {
    switch (role) {
      case "admin":
        return "Dashboard";
      case "production-manager":
        return "Home";
      case "sales-rep":
        return "Home";
      default:
        return "Dashboard";
    }
  };

  const [activeLabel, setActiveLabel] = useState(getDefaultLabel(role));

  const toggleDrawer = () => setOpen((prev) => !prev);
  const toggleFab = () => setFabOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {/* SIDEBAR Desktop */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-72 bg-white shadow-md z-20">
        <Sidebar activeLabel={activeLabel} setActiveLabel={setActiveLabel} />
      </aside>

      {/* SIDEBAR Mobile Drawer */}
      <ConfigProvider
        theme={{ components: { Drawer: { colorBgElevated: "#ffffff" } } }}
      >
        <Drawer
          placement="left"
          width="80%"
          onClose={toggleDrawer}
          open={open}
          closeIcon={<IoMdClose className="text-2xl" />}
        >
          <Sidebar
            activeLabel={activeLabel}
            setActiveLabel={setActiveLabel}
            onClose={toggleDrawer}
          />
        </Drawer>
      </ConfigProvider>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-72 w-full">
        {/* HEADER */}
        <header className="fixed top-0 left-0 lg:left-72 w-full lg:w-[calc(100%-18rem)] bg-white shadow-sm z-10 px-5 py-4 flex justify-between items-center">
          {/* Hamburger (mobile only) */}
          <button className="lg:hidden" onClick={toggleDrawer}>
            <RxHamburgerMenu className="text-2xl" />
          </button>

          {/* Topbar */}
          <div className="flex-1">
            {role === "sales-rep" ? (
              <SalesRepTopbar label={activeLabel} />
            ) : (
              <Topbar label={activeLabel} />
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 mt-20 p-4 relative">
          <Outlet />

          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6 flex flex-col items-end z-50 space-y-3">
            {/* Expanded Buttons */}
            {fabOpen && (
              <div className="flex flex-col items-end space-y-3 mb-2">
                <button onClick={() => navigate("/s/sales-rep/add-client")} className="flex items-center justify-center w-50 p-2 h-12 rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition">
                  Add Client
                </button>
                <button onClick={() => navigate("/s/sales-rep/add-new-quote")} className="flex items-center justify-center w-50 p-2 h-12 rounded-2xl bg-green-500 text-white shadow-lg hover:bg-green-600 transition">
                  Add Quote
                </button>
                <button onClick={() => navigate("/s/sales-rep/add-job")} className="flex items-center justify-center w-50 p-2 h-12 rounded-2xl bg-red-500 text-white shadow-lg hover:bg-red-600 transition">
                  Add Job
                </button>
              </div>
            )}

            {/* Main FAB */}
            <button
              className={`flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-transform ${
                fabOpen ? "rotate-45" : ""
              }`}
              onClick={toggleFab}
            >
              <FiPlus className="text-2xl" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
