
import StarRating from "../../UserComponents/Common/StarRating";

const ClientDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Client Details</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
          <h2 className="text-lg font-semibold text-gray-700">
            Search Mitchell
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Client office (Jan 2025)
          </span>
        </div>
      </div>

      <div>
        {/* Left Column - Client Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  defaultValue="Sposado"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email: Mitchell
                </label>
                <input
                  type="email"
                  defaultValue="us@mintchell@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  defaultValue="12325-94836"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  defaultValue="12325-94836"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  defaultValue="123 Main St. Gallery 3678/2020"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Load Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Load Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load Source
                </label>
                <select
                  name=""
                  id=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="select">Select</option>
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call Status
                </label>
                <select
                  name=""
                  id=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="select">Select</option>
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                </select>
              </div>
            </div>{" "}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <span className="block text-gray-600 mb-2 font-medium">
              Lead Rating
            </span>
            <StarRating value={4} />
          </div>

          {/* Call History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Call History
            </h3>
            <div className="space-y-4">
              {/* Call Item 1 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">
                      Outbound Call
                    </span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Protected perfect requirements and specific Client
                    information in client-representers
                  </p>
                </div>
              </div>

              {/* Call Item 2 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">
                      Inbound Call
                    </span>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Test library check services. Protected back information and
                    scheduled follow-up.
                  </p>
                </div>
              </div>

              {/* Add Call Button */}
              <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                Add call key
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Notes & Attachments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Notes & Attachments
            </h3>
            <textarea
              placeholder="Add online about this client..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Add File
              </button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Attach Image
              </button>
            </div>
          </div>

          {/* Load Follow-Up */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Load Follow-Up
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              What would you like to do with this load after No Pickup?
            </p>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="followup"
                  className="mr-3 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Simple for future follow-up
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="followup"
                  className="mr-3 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Strong power (exit status)
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
            <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Convert to Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
