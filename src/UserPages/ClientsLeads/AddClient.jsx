import React, { useState } from "react";

const AddClient = () => {
  const [rating, setRating] = useState(4);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Client</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form className="space-y-6">
            {/* ------------------------- NAME + SPOUSE ------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Spouse Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spouse Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter spouse name"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* ------------------------- PHONE + EMAIL ------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* ------------------------- CLIENT ADDRESS FULL ROW ------------------------- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Address *
              </label>
              <input
                type="text"
                placeholder="Enter client address"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ------------------------- LEAD SOURCE + CALL STATUS ------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
              {/* Lead Source */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Lead Source *
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Inbound</option>
                  <option>Outbound</option>
                  <option>Referral</option>
                  <option>Website</option>
                  <option>Social Media</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Call Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Call Status *
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Picked Up Yes</option>
                  <option>Voicemail</option>
                  <option>No Answer</option>
                  <option>Busy</option>
                  <option>Wrong Number</option>
                  <option>Call Back</option>
                </select>
              </div>
            </div>

            {/* ------------------------- RATING ------------------------- */}
            <div className="border-t pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Lead Rating
              </label>

              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= rating ? (
                      <span className="text-yellow-400">★</span>
                    ) : (
                      <span className="text-gray-300">☆</span>
                    )}
                  </button>
                ))}

                <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
              </div>
            </div>

            {/* ------------------------- ACTION BUTTONS ------------------------- */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                className="flex-1 py-3 border text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
