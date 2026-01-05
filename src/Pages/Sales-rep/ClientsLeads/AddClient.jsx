import { useState } from "react";
import { useCreateClientMutation } from "../../../redux/api/clientApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  console.log("User", user);
  const [formData, setFormData] = useState({
    salesRepId: user.role==="sales-rep"?user._id:null,
    clientName: "",
    partnerName: "",
    phoneNumber: "",
    email: "",
    address: "",
    leadSource: "", // "Door", "Inbound", "Social"
    rating: 0, // default rating
    callStatus: "", // "Not Called", "Picked-Up Yes", etc.
  });

  const callStatuses = [
    "Not Called",
    "Picked-Up Yes",
    "Picked-Up No",
    "No Pickup",
  ];
  const leadSources = ["Door", "Inbound", "Social"];

  const [addClient, { isLoading }] = useCreateClientMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "clientName",
      "phoneNumber",
      "address",
      "leadSource",
      "callStatus",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the required field: ${field}`);
        return;
      }
    }
    console.log("Form Data", formData);
    try {
      await addClient(formData).unwrap();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setFormData({
        salesRepId: user.role === "sales-rep" ? user._id : null,
        clientName: "",
        partnerName: "",
        phoneNumber: "",
        email: "",
        address: "",
        leadSource: "",
        rating: 0,
        callStatus: "",
      });
    } catch (error) {
      console.error("Failed to create client:", error);
      alert("Failed to create client. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      salesRepId: user.role === "sales-rep" ? user._id : null,
      clientName: "",
      partnerName: "",
      phoneNumber: "",
      email: "",
      address: "",
      leadSource: "",
      rating: 0,
      callStatus: "",
    });
    navigate("/s/sales-rep/clients");
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Client</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {showSuccess && (
            <div className="mb-4 p-4 text-green-800 bg-green-100 rounded border border-green-200">
              Client added successfully!
            </div>
          )}

          <form onSubmit={handleCreateClient} className="space-y-6">
            {/* Client & Partner Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) =>
                    handleInputChange("clientName", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter partner name"
                  value={formData.partnerName}
                  onChange={(e) =>
                    handleInputChange("partnerName", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Address *
              </label>
              <input
                type="text"
                placeholder="Enter client address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Lead leadSource & Call Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Lead leadSource *
                </label>
                <select
                  value={formData.leadSource}
                  onChange={(e) =>
                    handleInputChange("leadSource", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select leadSource</option>
                  {leadSources.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Call Status *
                </label>
                <select
                  value={formData.callStatus}
                  onChange={(e) =>
                    handleInputChange("callStatus", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Status</option>
                  {callStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating */}
            <div className="border-t pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Lead Rating
              </label>
              <div className="flex items-center space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleInputChange("rating", star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= formData.rating ? (
                      <span className="text-yellow-400">★</span>
                    ) : (
                      <span className="text-gray-300">☆</span>
                    )}
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating}/5
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 border text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Client"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
