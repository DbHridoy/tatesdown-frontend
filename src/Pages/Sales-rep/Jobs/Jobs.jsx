

import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import DataTable from "../../../Components/Common/DataTable";
import { useGetAllJobsQuery } from "../../../redux/api/jobApi";
import { useState } from "react";
function Jobs() {
  const navigate = useNavigate();
  const { data } = useGetAllJobsQuery();
  const jobs = data?.data ?? [];

  console.log("Jobs from jobs",jobs);

   const columnData = [
      { label: "No", accessor: "No" },
      { label: "Client Name", accessor: "clientName" },
      { label: "Estimated Price", accessor: "estimatedPrice" },
      {
        label: "Start Date",
        accessor: "startDate",
      },
      {
        label:"Status",
        accessor:"status"
      }
    ];
  
    const filterData = [
      // {
      //   label: "Status",
      //   accessor: "status",
      //   options: ["Pending", "Accepted", "Rejected"],
      // },
    ];
  
    const actionData = [
      {
        label: "Delete",
        modal: true,
        modalTitle: "Delete Client",
        modalMessage: (item) =>
          `Are you sure you want to delete ${item.clientName}?`,
        onConfirm: (item) => console.log("Deleted", item),
      },
      {
        label: "View",
        className: "bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600 text-white",
        onClick: (item) => navigate(`/s/sales-rep/jobs/${item.id}`),
      },
    ];
  
    const [params, setParams] = useState({
      page: 1,
      limit: 10,
      search: "",
      sort: "", // API value
      sortKey: "", // UI only
      sortOrder: "asc", // "asc" | "desc"
      filters: {},
    });
    
    const totalItems = jobs.length;
    
    const formattedQuote = jobs?.map((quote) => ({
      ...quote,
      clientName: quote.clientId?.clientName || "Unknown",
    }));
  
    const handleSearch = (search) => {
      setParams((p) => ({ ...p, search, page: 1 }));
    };
    
    const handleSortChange = (key) => {
      setParams((prev) => {
        let order = "asc";
  
        // same column → toggle
        if (prev.sortKey === key) {
          order = prev.sortOrder === "asc" ? "desc" : "asc";
        }
  
        return {
          ...prev,
          page: 1,
          sortKey: key,
          sortOrder: order,
          sort: order === "asc" ? key : `-${key}`,
        };
      });
    };
  
    const handlePageChange = (page) => {
      setParams((p) => ({ ...p, page }));
    };
  
    const handleFilterChange = (key, value) => {
      setParams((p) => ({
        ...p,
        page: 1,
        filters: {
          ...p.filters,
          [key]: value,
        },
      }));
    };  
  return (
    <div>
      <div className="flex justify-between flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
          <p className="text-gray-600">Manage your jobs and track progress</p>
        </div>
        <button
          className="bg-primarycolor text-white flex flex-row items-center p-4 rounded"
          onClick={() => navigate("/s/sales-rep/add-new-job")}
        >
          <HugeiconsIcon icon={UserAdd01Icon} />
          Add Job
        </button>
      </div>
      <div className="space-y-4">
        <DataTable
        title="Quote"
        data={formattedQuote || []} // 🔴 adjust if backend uses different key
        totalItems={totalItems}
        columns={columnData}
        actions={actionData}
        currentPage={params.page}
        itemsPerPage={params.limit}
        sortKey={params.sortKey}
        sortOrder={params.sortOrder}
        filters={filterData}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      </div>
    </div>
  );
}

export default Jobs;
