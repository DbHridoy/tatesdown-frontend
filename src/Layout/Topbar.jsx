import { FiBell } from "react-icons/fi";
import { useGetMeQuery } from "../redux/api/userApi";

const Topbar = ({ label }) => {
  const { data: profileData } = useGetMeQuery();
  const profile = profileData?.data;
  console.log("Profile data:", profile);
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
