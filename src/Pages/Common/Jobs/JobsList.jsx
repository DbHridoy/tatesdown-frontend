import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DataTable from "../../../Components/Common/DataTable";
import { useDeleteJobMutation, useGetAllJobsQuery } from "../../../redux/api/jobApi";

function JobsList() {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "",
    sortOrder: "asc",
  });

  const { data, isLoading } = useGetAllJobsQuery(params);
  const [deleteJob] = useDeleteJobMutation();

  const jobs = data?.data || [];
  const totalItems = data?.total || 0;

  const formattedJobs = jobs.map((job) => ({
    _id: job._id,
    clientName: job.clientId?.clientName ?? "N/A",
    jobTitle: job.title,
    price: job.price ?? job.estimatedPrice ?? 0,
    jobStatus: job.status,
    startDate: new Date(job.estimatedStartDate ?? job.startDate).toLocaleDateString(),
  }));

  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Client Name", accessor: "clientName", sortable: true },
      { label: "Job Title", accessor: "jobTitle" },
      { label: "Price", accessor: "price" },
      { label: "Status", accessor: "jobStatus" },
      { label: "Start Date", accessor: "startDate" },
    ],
    actions: [
      {
        label: "View",
        className: "bg-blue-500 text-white p-2 rounded-lg",
        onClick: (item) => {
          navigate(`${item._id}`);
        },
      },
      {
        label: "Delete",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Delete Job",
        modalMessage: (item) =>
          `Are you sure you want to delete ${item.jobTitle}?`,
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
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Jobs
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your jobs and track progress
          </p>
        </div>
      </div>

      <DataTable
        title="Jobs"
        data={formattedJobs}
        config={tableConfig}
        loading={isLoading}
      />
    </div>
  );
}

export default JobsList;
