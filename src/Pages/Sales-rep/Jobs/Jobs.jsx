import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import AddNewJobModal from "./AddNewJob";
import { useGetAllJobsQuery } from "../../../redux/api/jobApi";
import DataTable from "../../../Components/Common/DataTable";

function Jobs() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, isLoading, isError, error } = useGetAllJobsQuery();
  const jobs = data?.data;
  const totalItems = data?.total;

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { role: "" },
  });
  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Client Name", accessor: "clientName", sortable: true },
      { label: "Job Title", accessor: "jobTitle" },
      { label: "Estimated Price", accessor: "estimatedPrice" },
      { label: "Job Status", accessor: "jobStatus" },
      { label: "Start Date", accessor: "startDate" },
    ],
    filters: [
      {
        label: "Role",
        accessor: "role",
        options: {
          "Sales rep": "sales-rep",
          "Production manager": "production-manager",
        },
      },
    ],
    actions: [
      {
        label: "View",
        className: "bg-blue-500 text-white p-2 rounded-lg",
        onClick: (item) => {
          setSelectedUserId(item._id);
          setIsViewModal(true);
        },
      },
      {
        label: "Delete",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Delete User",
        modalMessage: (item) =>
          `Are you sure you want to delete ${item.fullName}?`,
        onConfirm: (item) => deleteUser(item._id),
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
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
          <p className="text-gray-600">Manage your jobs and track progress</p>
        </div>
        <button
          className="bg-primarycolor text-white flex items-center gap-2 px-4 py-2 rounded"
          onClick={() => setShowAddModal(true)} // If you want to select a quote first
        >
          <HugeiconsIcon icon={UserAdd01Icon} />
          Add Job
        </button>
      </div>
      <DataTable title="Jobs" data={jobs} config={tableConfig} />;
      {/* Add Job Modal */}
      {showAddModal && (
        <AddNewJobModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

export default Jobs;
