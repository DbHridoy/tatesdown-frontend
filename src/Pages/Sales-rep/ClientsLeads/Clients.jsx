import { AddTeamIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../Components/Common/DataTable";
import {
  useDeleteClientMutation,
  useGetAllClientsQuery,
} from "../../../redux/api/clientApi";
import { useState } from "react";

function Clients() {
  const navigate = useNavigate();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { role: "" },
  });

  const { data:clientsData, isLoading } = useGetAllClientsQuery(params);
  
console.log("clientsData",clientsData)
  const [deleteClient] = useDeleteClientMutation();

  const clients = clientsData?.data;

  const totalItems = clientsData?.total;

  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Client Name", accessor: "clientName", sortable: true },
      { label: "Phone", accessor: "phoneNumber" },
      {
        label: "Call Status",
        accessor: "callStatus",
        colorMap: {
          "Not Called": "bg-gray-100 text-gray-700 rounded-2xl text-center p-2",
          "Picked-Up Yes":
            "bg-green-100 text-green-800 rounded-2xl text-center p-2",
          "Picked-Up No": "bg-red-100 text-red-700 rounded-2xl text-center p-2",
          "No Pickup":
            "bg-yellow-100 text-yellow-700 rounded-2xl text-center p-2",
        },
      },
    ],
    filters: [
      {
        label: "Call Status",
        accessor: "callStatus",
        options: ["Not Called", "Picked-Up Yes", "Picked-Up No", "No Pickup"],
      },
    ],
    actions: [
      {
        label: "View",
        className: "bg-blue-500 text-white p-2 rounded-lg",
        onClick: (item) => navigate(`${item._id}`),
      },
      {
        label: "Delete",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Delete Client",
        modalMessage: (item) =>
          `Are you sure you want to delete ${item.clientName}?`,
        onConfirm: (item) => deleteClient(item._id),
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

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
        <div className="mb-3 md:mb-0">
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-gray-500">Overview of your clients</p>
        </div>
        <button
          onClick={() => navigate("/s/sales-rep/add-client")}
          className="bg-[#E6F2FA] text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#d4eaf6] transition-colors"
        >
          <HugeiconsIcon icon={AddTeamIcon} />
          <span>Add Client</span>
        </button>
      </div>
      {totalItems === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No clients found</p>
        </div>
      ) : (
        <DataTable title="Clients" data={clients || []} config={tableConfig} />
      )}
    </div>
  );
}

export default Clients;
