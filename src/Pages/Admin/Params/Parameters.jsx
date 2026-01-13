import MileageRate from "../../../Components/Admin/Params/MileageRate";
import FiscalYear from "../../../Components/Admin/Params/FiscalYear";
import Quickbooks from "../../../Components/Admin/Params/Quickbooks";
import { useState } from "react";

const Parameters = () => {
  const [activeTab, setActiveTab] = useState("mileage");
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div>
        {/* Tabs */}
        <div className="mb-6 bg-white border-b border-gray-200 rounded-t-lg">
          <div className="flex px-6 space-x-8">
            <button
              onClick={() => setActiveTab("mileage")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "mileage"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              MILEAGE RATE
            </button>
            <button
              onClick={() => setActiveTab("fiscal")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "fiscal"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              FISCAL PERIODS
            </button>
            {/* <button
              onClick={() => setActiveTab("quickbooks")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "quickbooks"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              QUICKBOOKS INTEGRATION
            </button> */}
          </div>
        </div>

        {/* Mileage Rate Section */}
        {activeTab === "mileage" && <MileageRate />}

        {/* Fiscal Period Definitions Section */}
        {activeTab === "fiscal" && <FiscalYear />}

        {/* QuickBooks Integration Section */}
        {/* {activeTab === "quickbooks" && <Quickbooks />} */}
      </div>
    </div>
  );
};

export default Parameters;
