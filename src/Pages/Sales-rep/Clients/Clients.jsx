import { AddTeamIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../Components/Common/DataTable";
import {
  useDeleteClientMutation,
  useGetAllClientsQuery,
} from "../../../redux/api/clientApi";
import { useState } from "react";
import toast from "react-hot-toast";

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

  const { data: clientsData, isLoading } = useGetAllClientsQuery(params);

  //console.log("clientsData", clientsData);
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
          "Picked-Up: Appointment Booked":
            "bg-green-100 text-green-800 rounded-2xl text-center p-2",
          "Picked-Up: No Appointment":
            "bg-red-100 text-red-700 rounded-2xl text-center p-2",
          "No Pickup":
            "bg-yellow-100 text-yellow-700 rounded-2xl text-center p-2",
        },
      },
      {
        label: "Lead Status",
        accessor: "leadStatus",
        colorMap: {
          "Not quoted": "bg-gray-100 text-gray-700 rounded-2xl text-center p-2",
          Quoted: "bg-blue-100 text-blue-800 rounded-2xl text-center p-2",
          Job: "bg-green-100 text-green-800 rounded-2xl text-center p-2",
        },
      },
    ],
    filters: [
      {
        label: "Call Status",
        accessor: "callStatus",
        options: {
          "Not Called": "Not Called",
          "Picked-Up: Appointment Booked": "Picked-Up: Appointment Booked",
          "Picked-Up: No Appointment": "Picked-Up: No Appointment",
          "No Pickup": "No Pickup",
        },
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
        onConfirm: (item) => {
          deleteClient(item._id);
          toast.success("Client deleted successfully");
        },
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
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
        <div className="mb-3 md:mb-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            My Clients
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Overview of your clients
          </p>
        </div>
      </div>
      <DataTable title="Clients" data={clients || []} config={tableConfig} />
    </div>
  );
}

export default Clients;
