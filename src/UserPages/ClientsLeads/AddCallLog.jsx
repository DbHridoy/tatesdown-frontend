import React from "react";

const AddCallLog = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add Call Log</h2>
        </div>

        {/* Form Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Call Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Call Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Call Outcome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Call Outcome <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Select outcome...</option>
              <option>Connected - Positive</option>
              <option>Connected - Negative</option>
              <option>Voicemail</option>
              <option>No Answer</option>
              <option>Busy</option>
              <option>Wrong Number</option>
            </select>
          </div>

          {/* Call Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Call Notes
            </label>
            <textarea
              rows="4"
              placeholder="Enter details about the call..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 border-t flex gap-3 bg-gray-50">
          <button
            onClick={closeModal}
            className="flex-1 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCallLog;
