import { useState } from "react";
import { FiBell } from "react-icons/fi";
import NotificationsDropdown from "../Components/Common/NotificationsDropdown";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "../redux/api/common";
import { useGetMeQuery } from "../redux/api/userApi";

const Topbar = ({ label }) => {
  const { data: profileData } = useGetMeQuery();
  const profile = profileData?.data;
  const { data: notificationsData } = useGetNotificationsQuery();
  const [markNotificationRead] = useMarkNotificationReadMutation();
  const notifications = notificationsData?.data ?? [];
  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const [isOpen, setIsOpen] = useState(false);
  //console.log("Profile data:", profile);
  return (
    <div className="flex justify-between  items-center ">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>

      {/* Right section: notifications + avatar */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative hover:text-gray-900 dark:hover:text-white transition-colors"
          >
          <FiBell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {isOpen && (
            <NotificationsDropdown
              notifications={notifications}
              onItemClick={async (item) => {
                if (item.isRead) return;
                await markNotificationRead(item._id).unwrap();
              }}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={profile?.profileImage || ""}
            alt={profile?.fullName || "User"}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
          />
          <div>
            <p className="hidden md:block font-medium">
              {profile?.fullName || "Username"}
            </p>
            <p>{profile?.role || "User Role"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
