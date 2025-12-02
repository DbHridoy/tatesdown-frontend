import React from "react";
import { FiBell } from "react-icons/fi";

const Topbar = ({ label, user }) => {
  return (
    <div className="flex justify-between  items-center ">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>

      {/* Right section: notifications + avatar */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative hover:text-gray-900 dark:hover:text-white transition-colors">
          <FiBell className="w-6 h-6" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={user?.avatar || "https://via.placeholder.com/40"}
            alt={user?.name || "User"}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
          />
          <div>
            <p className="hidden md:block font-medium">
              {user?.name || "Username"}
            </p>
            <p>{user?.role || "User Role"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
