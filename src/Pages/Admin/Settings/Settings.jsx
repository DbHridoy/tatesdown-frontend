import React, { useState, useEffect } from "react";
import { Calendar, RefreshCw, X, Check, AlertCircle } from "lucide-react";
import {
  useUpsertVariableMutation,
  useGetVariablesQuery,
} from "../../../redux/api/common";

const settings = () => {
  const { data: variable, isLoading } = useGetVariablesQuery();
  const [mileageRate, setMileageRate] = useState(0);

  useEffect(() => {
    if (variable?.data?.mileageRate !== undefined) {
      setMileageRate(variable.data.mileageRate);
    }
  }, [variable]); // run whenever variable changes

  console.log(mileageRate);

  const [fiscalStart, setFiscalStart] = useState("");
  const [fiscalEnd, setFiscalEnd] = useState("");
  const [reportingPeriod, setReportingPeriod] = useState("week");
  const [activeTab, setActiveTab] = useState("mileage");

  // QuickBooks Integration State
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);

  // UI State
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [originalValues, setOriginalValues] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const [upsertVariable] = useUpsertVariableMutation();

  // Store original values on mount
  useEffect(() => {
    setOriginalValues({
      mileageRate,
      fiscalStart,
      fiscalEnd,
      reportingPeriod,
    });
  }, []);

  // Check for changes
  useEffect(() => {
    const changed =
      mileageRate !== originalValues.mileageRate ||
      fiscalStart !== originalValues.fiscalStart ||
      fiscalEnd !== originalValues.fiscalEnd ||
      reportingPeriod !== originalValues.reportingPeriod;
    setHasChanges(changed);
  }, [mileageRate, fiscalStart, fiscalEnd, reportingPeriod, originalValues]);

  const validateMileageRate = (rate) => {
    const numRate = parseFloat(rate);
    if (isNaN(numRate)) {
      return "Please enter a valid number";
    }
    if (numRate < 0) {
      return "Mileage rate cannot be negative";
    }
    if (numRate > 10) {
      return "Mileage rate seems unusually high";
    }
    return null;
  };

  const validateDates = () => {
    if (fiscalStart && fiscalEnd) {
      const start = new Date(fiscalStart);
      const end = new Date(fiscalEnd);
      if (end <= start) {
        return "End date must be after start date";
      }
    }
    return null;
  };

  const handleSave = async () => {
    // Validate mileage rate
    const rateError = validateMileageRate(mileageRate);
    if (rateError) {
      setErrorMessage(rateError);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }

    // Validate dates
    const dateError = validateDates();
    if (dateError) {
      setErrorMessage(dateError);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }

    // Save settings
    const settings = {
      mileageRate: parseFloat(mileageRate),
      // fiscalStart,
      // fiscalEnd,
      // reportingPeriod,
      // savedAt: new Date().toISOString()
    };

    await upsertVariable(settings).unwrap();

    // Simulate API call
    setTimeout(() => {
      // Update original values
      setOriginalValues({
        mileageRate,
        fiscalStart,
        fiscalEnd,
        reportingPeriod,
      });

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);

      console.log("Settings saved:", settings);
    }, 500);
  };

  const handleCancel = () => {
    // Reset to original values
    setMileageRate(originalValues.mileageRate);
    setFiscalStart(originalValues.fiscalStart);
    setFiscalEnd(originalValues.fiscalEnd);
    setReportingPeriod(originalValues.reportingPeriod);
    setHasChanges(false);
  };

  const handleDisconnect = () => {
    if (
      window.confirm(
        "Are you sure you want to disconnect from QuickBooks? This will stop automatic syncing."
      )
    ) {
      setIsConnected(false);
      console.log("QuickBooks disconnected");
    }
  };

  const handleConnect = () => {
    // Simulate OAuth connection flow
    setTimeout(() => {
      setIsConnected(true);
      setLastSync(new Date());
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      console.log("QuickBooks connected");
    }, 1000);
  };

  const handleSyncNow = () => {
    if (!isConnected) return;

    setIsSyncing(true);

    // Simulate sync operation
    setTimeout(() => {
      setLastSync(new Date());
      setIsSyncing(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      console.log("Synced at:", new Date().toISOString());
    }, 2000);
  };

  const formatLastSync = (date) => {
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div>
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed z-50 flex items-center px-6 py-3 space-x-2 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4 animate-slide-in">
            <Check className="w-5 h-5" />
            <span>Changes saved successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {showErrorMessage && (
          <div className="fixed z-50 flex items-center px-6 py-3 space-x-2 text-white bg-red-500 rounded-lg shadow-lg top-4 right-4 animate-slide-in">
            <AlertCircle className="w-5 h-5" />
            <span>{errorMessage}</span>
          </div>
        )}

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
            {/* <button
              onClick={() => setActiveTab('fiscal')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'fiscal'
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FISCAL PERIODS
            </button>
            <button
              onClick={() => setActiveTab('quickbooks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'quickbooks'
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              QUICKBOOKS INTEGRATION
            </button> */}
          </div>
        </div>

        {/* Mileage Rate Section */}
        {activeTab === "mileage" && (
          <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
            <div>
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                Mileage Rate per Mile
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Set the default mileage reimbursement rate
              </p>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mileage Rate
                </label>
                <div className="relative">
                  <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
                    $
                  </span>
                  <input
                    type="text"
                    value={mileageRate}
                    onChange={(e) => setMileageRate(e.target.value)}
                    className="w-full py-2 pr-3 border border-gray-300 rounded-md pl-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.50"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Standard IRS rate for 2025 is $0.70 per mile
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  disabled={!hasChanges}
                  className={`px-4 py-2 border border-gray-300 rounded-md font-medium transition-colors ${
                    hasChanges
                      ? "text-gray-700 hover:bg-gray-50"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    hasChanges
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fiscal Period Definitions Section */}
        {activeTab === "fiscal" && (
          <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
            <div>
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                Fiscal Period Definitions
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Configure your fiscal year and reporting periods.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={fiscalStart}
                      onChange={(e) => setFiscalStart(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={fiscalEnd}
                      onChange={(e) => setFiscalEnd(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Reporting Period
                </h3>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="period"
                      value="week"
                      checked={reportingPeriod === "week"}
                      onChange={(e) => setReportingPeriod(e.target.value)}
                      className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Week</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="period"
                      value="month"
                      checked={reportingPeriod === "month"}
                      onChange={(e) => setReportingPeriod(e.target.value)}
                      className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Month</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="period"
                      value="custom"
                      checked={reportingPeriod === "custom"}
                      onChange={(e) => setReportingPeriod(e.target.value)}
                      className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Custom Range
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  disabled={!hasChanges}
                  className={`px-4 py-2 border border-gray-300 rounded-md font-medium transition-colors ${
                    hasChanges
                      ? "text-gray-700 hover:bg-gray-50"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    hasChanges
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QuickBooks Integration Section */}
        {activeTab === "quickbooks" && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div>
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                QuickBooks Integration Status
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Manage your QuickBooks Online connection
              </p>

              {isConnected ? (
                <div className="p-4 mb-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-900">
                        Integration Status: Connected
                      </span>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    Last Sync: {formatLastSync(lastSync)}
                  </p>
                </div>
              ) : (
                <div className="p-4 mb-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-900">
                      Integration Status: Disconnected
                    </span>
                  </div>
                  <p className="text-xs text-yellow-700">
                    Connect to QuickBooks to enable automatic syncing
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                {isConnected ? (
                  <button
                    onClick={handleDisconnect}
                    className="flex items-center px-4 py-2 font-medium text-red-600 transition-colors border border-red-300 rounded-md hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={handleConnect}
                    className="flex items-center px-4 py-2 font-medium text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Connect to QuickBooks
                  </button>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={handleSyncNow}
                    disabled={!isConnected || isSyncing}
                    className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                      isConnected && !isSyncing
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <RefreshCw
                      className={`w-4 h-4 mr-2 ${
                        isSyncing ? "animate-spin" : ""
                      }`}
                    />
                    {isSyncing ? "Syncing..." : "Sync Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default settings;
