import React, { useState } from "react";
import { DollarSign, Briefcase, Map, Users } from "lucide-react";
import {
  useChangeMileageLogStatusMutation,
  useGetPendingMileageLogsQuery,
} from "../../../redux/api/expenseApi";
import DataTable from "../../../Components/Common/DataTable";
import DownpaymentRequest from "../../../Components/Admin/Approval center/DownpaymentRequest";
import MileageApprovalRequests from "../../../Components/Admin/Approval center/MileageApprovalRequests";
import JobCloseRequests from "../../../Components/Admin/Approval center/JobCloseRequests";
import SalesRepresentativeModal from "../../../Components/Admin/Approval center/SalesRepresentativeModal";
import SalesAssignement from "../../../Components/Admin/Approval center/SalesAssignement";
import { useGetAllClientsQuery } from "../../../redux/api/clientApi";

const Approvals = () => {
  const [activeTab, setActiveTab] = useState("downpayment");
  const [open, setOpen] = useState(false);



  // const reps = [
  //   "John Doe",
  //   "Sarah Parker",
  //   "Michael Smith",
  //   "Aisha Rahman",
  //   "David Miller",
  // ];
  const tabs = [
    { id: "downpayment", label: "Downpayment Approval", count: 0 },
    { id: "jobclose", label: "Job Close Approvals", count: 0 },
    { id: "mileage", label: "Mileage Log Approvals", count: 0 },
    { id: "leadassignment", label: "Lead Assignment", count: 0 },
  ];

 



 


 

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
      {activeTab === "leadassignment" && (
       <SalesAssignement/>
      )}
      
    </div>
  );
};
export default Approvals;
