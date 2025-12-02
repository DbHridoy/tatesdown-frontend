import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

import Topbar from "../Components/Dashboard/Layout/Topbar";
import Sidebar from "../Components/Dashboard/Layout/Sidebar";
import SalesRepTopbar from "../Components/Dashboard/Layout/SalesRepTopbar";

const MainLayout = () => {
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex bg-gray-50">
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
        <main className="flex-1 mt-20 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
