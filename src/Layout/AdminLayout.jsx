import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import AdminSidebar from "../Components/Dashboard/Sidebar/AdminSidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 z-10 w-full bg-white shadow-sm lg:ml-72">
        <div className="flex items-center justify-between py-4 px-5">
          {/* <h1 className="text-2xl font-bold">Sales Rep</h1> */}
          <button className="block lg:hidden" onClick={toggleDrawer}>
            <RxHamburgerMenu className="text-2xl" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        <div className="hidden lg:block fixed left-0 h-full w-72 bg-white shadow-md">
          <AdminSidebar />
        </div>

        {/* Sidebar Mobile Drawer */}
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
            <AdminSidebar />
          </Drawer>
        </ConfigProvider>

        {/* Main Content */}
        <main className="flex-1 p-5 pt-24 lg:ml-72">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
