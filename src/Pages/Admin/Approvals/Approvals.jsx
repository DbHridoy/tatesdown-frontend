import React, { useState } from "react";
import { DollarSign, Briefcase, Map, Users } from "lucide-react";
import SalesRepresentativeModal from "../../../Components/Dashboard/Approvals/SalesRepresentativeModal";
import {
  useChangeMileageLogStatusMutation,
  useGetPendingMileageLogsQuery,
} from "../../../redux/api/expenseApi";
import DataTable from "../../../Components/Common/DataTable";

const Approvals = () => {
  const [activeTab, setActiveTab] = useState("downpayment");
  const [open, setOpen] = useState(false);
  const [changeMileageLogStatus, { isLoading: isChangeLoading }] =
    useChangeMileageLogStatusMutation();

  const { data: getPendingMileageLogs, isLoading: isGetLoading } =
    useGetPendingMileageLogsQuery();
  console.log(getPendingMileageLogs);
  const mileageData = getPendingMileageLogs?.data ?? [];

  const formattedMileageData = mileageData.map((m) => ({
    salesRep: m.salesRepId?.fullName ?? "N/A",
    requestedAmount: m.deduction,
    status: m.status,
  }));

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { role: "" },
  });

  const totalItems = getPendingMileageLogs?.total;
  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Sales Rep", accessor: "salesRep", sortable: true },
      { label: "Requested Amount", accessor: "requestedAmount" },
      { label: "Status", accessor: "status" },
    ],
    // filters: [
    //   {
    //     label: "Role",
    //     accessor: "role",
    //     options: {
    //       "Sales rep": "sales-rep",
    //       "Production manager": "production-manager",
    //     },
    //   },
    // ],
    actions: [
      {
        label: "Approve",
        className: "bg-green-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Approve Mileage Log",
        modalMessage: (item) =>
          `Are you sure you want to approve ${item.fullName}?`,
        onConfirm: (item) => changeMileageLogStatus(item._id, "Approved"),
      },
      {
        label: "Reject",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Reject Mileage Log",
        modalMessage: (item) =>
          `Are you sure you want to reject ${item.fullName}?`,
        onConfirm: (item) => changeMileageLogStatus(item._id, "Rejected"),
      },
    ],
    totalItems: totalItems,
    currentPage: params.page,
    itemsPerPage: params.limit,
    sortKey: params.sortKey,
    sortOrder: params.sortOrder,
    onPageChange: (page) => setParams((p) => ({ ...p, page })),
    onSearch: (search) => setParams((p) => ({ ...p, search, page: 1 })),
    onFilterChange: (key, value) =>
      setParams((p) => ({
        ...p,
        page: 1,
        filters: { ...p.filters, [key]: value },
      })),
    onSortChange: (sortKey, sortOrder) =>
      setParams((p) => ({ ...p, sortKey, sortOrder })),
  };

  const reps = [
    "John Doe",
    "Sarah Parker",
    "Michael Smith",
    "Aisha Rahman",
    "David Miller",
  ];
  const tabs = [
    { id: "downpayment", label: "Downpayment Approval", count: 0 },
    { id: "jobclose", label: "Job Close Approvals", count: 0 },
    { id: "mileage", label: "Mileage Log Approvals", count: 0 },
    { id: "leadassignment", label: "Lead Assignment Approvals", count: 0 },
  ];

  const downpaymentData = [
    {
      leadId: "L12345",
      client: "John Doe",
      amount: "$500",
      status: "Pending Review",
    },
    {
      leadId: "L12345",
      client: "Jane Smith",
      amount: "$300",
      status: "Pending Review",
    },
  ];

  const jobCloseData = [
    {
      jobId: "J12345",
      client: "John Doe",
      amount: "$5,0000",
      status: "Pending Closure",
    },
    {
      jobId: "J12345",
      client: "Jane Smith",
      amount: "$2,500",
      status: "Pending Closure",
    },
  ];

  const leadAssignmentData = [
    {
      leadId: "L12345",
      client: "John Doe",
      rep: "Rep A",
      status: "Waiting Assignment",
    },
    {
      leadId: "L12345",
      client: "John Doe",
      rep: "Rep A",
      status: "Waiting Assignment",
    },
  ];

  const getIcon = (tabId) => {
    const icons = {
      downpayment: <DollarSign className="w-4 h-4" />,
      jobclose: <Briefcase className="w-4 h-4" />,
      mileage: <Map className="w-4 h-4" />,
      leadassignment: <Users className="w-4 h-4" />,
    };
    return icons[tabId];
  };

  const getStatusColor = (status) => {
    if (
      status.includes("Pending Review") ||
      status.includes("Pending Closure")
    ) {
      return "bg-orange-400 text-white";
    }
    if (status.includes("Waiting Assignment")) {
      return "bg-yellow-500 text-white";
    }
    return "bg-orange-400 text-white";
  };

  return (
    <div className="w-full min-h-screen p-6 mx-auto ">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
            <span className="bg-gray-300 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Downpayment Approval Section */}
      {activeTab === "downpayment" && (
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Downpayment Approval
                </h2>
                <p className="text-sm text-gray-600">
                  Review and approve downpayment requests
                </p>
              </div>
            </div>
            <span className="font-semibold text-blue-600">2 Pending</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Lead ID
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Client Info
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Amount Requested
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Approval Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {downpaymentData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.leadId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-800">
                          {item.client}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded hover:bg-red-600">
                          Reject
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded hover:bg-blue-600">
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Job Close Approvals Section */}
      {activeTab === "jobclose" && (
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Job Close Approvals
                </h2>
                <p className="text-sm text-gray-600">
                  Review and approve job closures
                </p>
              </div>
            </div>
            <span className="font-semibold text-blue-600">2 Pending</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Job ID
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Client Info
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Amount Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Approval Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobCloseData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.jobId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-800">
                          {item.client}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded hover:bg-blue-600">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mileage Log Approvals Section */}
      {activeTab === "mileage" && (
        <DataTable
          title="Mileage Log Approvals"
          data={formattedMileageData}
          config={tableConfig}
        />
      )}

      {/* Lead Assignment Approvals Section */}
      {activeTab === "leadassignment" && (
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Lead Assignment Approvals
                </h2>
                <p className="text-sm text-gray-600">
                  Review and approve lead assignments
                </p>
              </div>
            </div>
            <span className="font-semibold text-blue-600">2 Pending</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Lead ID
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Client Info
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Amount Requested
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Approval Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leadAssignmentData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {item.leadId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-800">
                          {item.client}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-800">
                          {item.rep}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {/* <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded hover:bg-red-600">
                          Reject
                        </button> */}
                        <button
                          onClick={() => setOpen(true)}
                          className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <SalesRepresentativeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        reps={reps}
      />
    </div>
  );
};
export default Approvals;
