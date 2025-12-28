import React, { useState } from "react";
import { DollarSign, Briefcase, Map, Users } from "lucide-react";
import SalesRepresentativeModal from "../../../Components/Dashboard/Approvals/SalesRepresentativeModal";
import {
  useChangeMileageLogStatusMutation,
  useGetPendingMileageLogsQuery,
} from "../../../redux/api/expenseApi";
import DataTable from "../../../Components/Common/DataTable";
import DownpaymentRequest from "../../../Components/Admin/Approval center/DownpaymentRequest";
import MileageApprovalRequests from "../../../Components/Admin/Approval center/MileageApprovalRequests";
import JobCloseRequests from "../../../Components/Admin/Approval center/JobCloseRequests";

const Approvals = () => {
  const [activeTab, setActiveTab] = useState("downpayment");
  const [open, setOpen] = useState(false);

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
    // { id: "leadassignment", label: "Lead Assignment Approvals", count: 0 },
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
            {/* <span className="bg-gray-300 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {tab.count}
            </span> */}
          </button>
        ))}
      </div>

      {/* Downpayment Approval Section */}
      {activeTab === "downpayment" && <DownpaymentRequest />}

      {/* Job Close Approvals Section */}
      {activeTab === "jobclose" && (
        <JobCloseRequests/>
      )}

      {/* Mileage Log Approvals Section */}
      {activeTab === "mileage" && <MileageApprovalRequests />}

      {/* Lead Assignment Approvals Section */}
      {/* {activeTab === "leadassignment" && (
       <SalesAssignement/>
      )} */}
      <SalesRepresentativeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        reps={reps}
      />
    </div>
  );
};
export default Approvals;
