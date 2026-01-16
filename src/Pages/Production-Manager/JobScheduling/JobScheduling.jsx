import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useChangeStatusMutation,
  useGetAllJobsQuery,
} from "../../../redux/api/jobApi";
import DataTable from "../../../Components/Common/DataTable";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slice/authSlice";

function JobScheduling() {
  const navigate = useNavigate();
  const me = useSelector(selectCurrentUser)
  console.log("line:14-me", me)
  const [changeStatus] = useChangeStatusMutation();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "",
    sortOrder: "asc",
    filters: { status: "Ready to Schedule" },
  });

  // ✅ Hook at top level
  const { data, isLoading } = useGetAllJobsQuery(params);

  const jobs = data?.data || [];
  const totalItems = data?.total || 0;

  // ✅ Safe formatting
  const formattedJobs = jobs.map((j) => ({
    _id: j._id,
    clientName: j.clientId?.clientName ?? "N/A",
    jobTitle: j.title,
    estimatedPrice: j.estimatedPrice,
    jobStatus: j.status,
    startDate: new Date(j.startDate).toLocaleDateString(),
  }));

  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Client Name", accessor: "clientName", sortable: true },
      { label: "Job Title", accessor: "jobTitle" },
      { label: "Estimated Price", accessor: "estimatedPrice" },
      { label: "Job Status", accessor: "jobStatus" },
      { label: "Start Date", accessor: "startDate" },
    ],
    actions: [
      {
        label: "View",
        className: "bg-blue-500 text-white p-2 rounded-lg",
        onClick: (item) => {
          navigate(`/production-manager/jobs/${item._id}`);
        },
      },
      {
        label: "Mark as scheduled",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Mark as scheduled",
        modalMessage: (item) =>
          `Are you sure you want to mark ${item.title} as scheduled?`,
        onConfirm: async (item) => {
          try {
            await changeStatus({
              id: item._id,
              status: "Scheduled",
              productionManagerId: me.productionManager._id,
            }).unwrap();
          } catch (err) {
            console.error(err);
          }
        },
      },
    ],
    totalItems,
    currentPage: params.page,
    itemsPerPage: params.limit,
    sortKey: params.sortKey,
    sortOrder: params.sortOrder,
    onPageChange: (page) => setParams((p) => ({ ...p, page })),
    onSearch: (search) => setParams((p) => ({ ...p, search, page: 1 })),
    onSortChange: (sortKey, sortOrder) =>
      setParams((p) => ({ ...p, sortKey, sortOrder })),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Scheduling</h1>
          <p className="text-gray-600">Manage your jobs and track progress</p>
        </div>
      </div>

      <DataTable title="Jobs" data={formattedJobs} config={tableConfig} />
    </div>
  );
}

export default JobScheduling;
