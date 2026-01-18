import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import AddNewJobModal from "./AddNewJob";
import { useGetAllJobsQuery, useDeleteJobMutation } from "../../../redux/api/jobApi";
import DataTable from "../../../Components/Common/DataTable";

function Jobs() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "",
    sortOrder: "asc",
  });

  // ✅ Hook at top level
  const { data, isLoading } = useGetAllJobsQuery(params);

  const jobs = data?.data || [];
  const totalItems = data?.total || 0;

  const [deleteJob] = useDeleteJobMutation();

  // ✅ Safe formatting
  const formattedJobs = jobs.map((j) => ({
    _id: j._id,
    clientName: j.clientId?.clientName ?? "N/A",
    jobTitle: j.title,
    price: j.price,
    jobStatus: j.status,
    estimatedStartDate: new Date(j.estimatedStartDate).toLocaleDateString(),
  }));

  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Client Name", accessor: "clientName", sortable: true },
      // { label: "Job Title", accessor: "jobTitle" },
      { label: "Price", accessor: "price" },
      { label: "Status", accessor: "jobStatus" },
      { label: "Est. Start Date", accessor: "estimatedStartDate" },
    ],
    actions: [
      {
        label: "View",
        className: "bg-blue-500 text-white p-2 rounded-lg",
        onClick: (item) => {
          //console.log(item);
          navigate(`/sales-rep/jobs/${item._id}`);
        },
      },
      {
        label: "Delete",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Delete User",
        modalMessage: (item) =>
          `Are you sure you want to delete ${item.title}?`,
        onConfirm: (item) => deleteJob(item._id),
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
          <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
          <p className="text-gray-600">Manage your jobs and track progress</p>
        </div>
        {/* <button
          className="bg-primarycolor text-white flex items-center gap-2 px-4 py-2 rounded"
          onClick={() => setShowAddModal(true)}
        >
          <HugeiconsIcon icon={UserAdd01Icon} />
          Add Job
        </button> */}
      </div>

      <DataTable
        title="Jobs"
        data={formattedJobs}
        config={tableConfig}
        loading={isLoading}
      />

      {showAddModal && (
        <AddNewJobModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

export default Jobs;
