import { useState, useEffect } from "react";
import { Edit, Briefcase, Camera, Check } from "lucide-react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";

const ProductionSettings = () => {
  const { data: profileData } = useGetUserQuery();
  const profile = profileData?.data;
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
    address: "",
  });

  // Update formData when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phoneNumber || "",
        role: profile.role || "",
        avatar: profile.profileImage || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: profile.fullName || "",
      email: profile.email || "",
      phone: profile.phoneNumber || "",
      role: profile.role || "",
      avatar: profile.profileImage || "",
      address: profile.address || "",
    });
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    try {
      setIsEditing(false); // Optionally disable editing while saving

      // Map formData to API expected fields
      const payload = {
        fullName: formData.name,
        phoneNumber: formData.phone,
        address: formData.address,
        profileImage: formData.avatar,
      };

      await updateUser(payload).unwrap();

      // Show success message
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again."); // Simple error handling
      setIsEditing(true); // Re-enable editing on error
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      {/* Success Message */}
      {showSaveSuccess && (
        <div className="flex items-center gap-2 p-4 mb-4 border border-green-200 rounded-lg bg-green-50">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            Profile updated successfully!
          </span>
        </div>
      )}

      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-1 text-xl font-semibold text-gray-900">
            Profile & Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3 group">
            <div className="w-20 h-20 overflow-hidden bg-gray-300 rounded-full">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-2xl font-semibold text-white bg-gradient-to-br from-blue-400 to-blue-600">
                  {formData.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-full opacity-0 cursor-pointer group-hover:opacity-100">
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({
                          ...prev,
                          avatar: reader.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}

            <div className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-white border-2 border-gray-200 rounded-full">
              <Briefcase className="w-3 h-3 text-gray-600" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-0.5">
            {formData.name}
          </h2>
          <p className="mb-3 text-sm text-gray-500">{formData.role}</p>

          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 text-sm text-gray-900 border rounded ${
                  isEditing
                    ? "border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-3 py-2 text-sm text-gray-900 border rounded ${
                  isEditing
                    ? "border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                readOnly={!isEditing}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`w-full px-3 py-2 text-sm text-gray-900 border rounded ${
                  isEditing
                    ? "border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleSaveChanges}
              disabled={isUpdating}
              className={`px-6 py-2.5 text-white rounded text-sm font-medium transition-colors ${
                isUpdating
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className={`px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 ${
                isUpdating ? "cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionSettings;
