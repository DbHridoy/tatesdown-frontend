import { AddTeamIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import Filters from "../../../Components/Sales-rep/Clients/Filters";
import ClientsTable from "../../../Components/Sales-rep/Clients/ClientsTable";
import DataTable from "../../../Components/Common/DataTable";
import { useGetAllClientsQuery } from "../../../redux/api/clientApi";

function Clients() {
  const navigate = useNavigate();
  const CALL_STATUS_COLORS = {
    "Not Called": "bg-gray-100 text-gray-700",
    "Picked-Up Yes": "bg-green-100 text-green-700",
    "Picked-Up No": "bg-red-100 text-red-700",
    "No Pickup": "bg-yellow-100 text-yellow-700",
  };
  const columnData = [
    { label: "No", accessor: "No" },
    { label: "Client Name", accessor: "clientName", sortable: true },
    { label: "Phone", accessor: "phoneNumber" },
    {
      label: "Call Status",
      accessor: "callStatus",
      colorMap: {
        "Not Called": "bg-gray-100 text-gray-700",
        "Picked-Up Yes": "bg-green-100 text-green-800",
        "Picked-Up No": "bg-red-100 text-red-700",
      },
    },
  ];

  const filterData = [
    {
      label: "Call Status",
      accessor: "callStatus",
      options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
    },
    {
      label: "Call Status",
      accessor: "callStatus",
      options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
    },
    {
      label: "Call Status",
      accessor: "callStatus",
      options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
    },
    {
      label: "Call Status",
      accessor: "callStatus",
      options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
    },
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
      label: "Edit",
      className: "bg-yellow-500 hover:bg-yellow-600 text-white",
      onClick: (item) => console.log("Edit", item),
    },
  ];

  //  const columns = [
  //   {
  //     header: "No",
  //     type: "index", // 👈 auto index
  //   },
  //   {
  //     header: "Client Name",
  //     accessor: "clientName",
  //     sortable: true,
  //     filterable: true,
  //   },
  //   {
  //     header: "Source",
  //     accessor: "source",
  //     filterable: true,
  //   },
  //   {
  //     header: "Call Status",
  //     accessor: "callStatus",
  //     type: "badge",
  //     filterable: true,
  //     colorMap: {
  //       "Not Called": "bg-gray-100 text-gray-700",
  //       "Picked-Up Yes": "bg-green-100 text-green-700",
  //       "Picked-Up No": "bg-red-100 text-red-700",
  //       "No Pickup": "bg-yellow-100 text-yellow-700",
  //     },
  //   },
  // ];

  //   const actions = [
  //     {
  //       label: "View",
  //       className: "bg-blue-100 text-blue-700",
  //       onClick: (row) => navigate(`/clients/${row._id}`),
  //     },
  //     {
  //       label: "Delete",
  //       className: "bg-red-100 text-red-700",
  //       modal: ({ row }) => ({
  //         title: "Delete Client",
  //         content: `Are you sure you want to delete ${row.clientName}?`,
  //         onConfirm: () => deleteClient(row._id),
  //       }),
  //     },
  //   ];

  const clientData = useGetAllClientsQuery();
  const clients = clientData?.data?.data;
  console.log(clients);

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

      {/* Filters */}
      {/* <div className="mb-4 md:mb-6">
        <Filters />
      </div> */}

      {/* Clients Table */}
      {/* <ClientsTable /> */}
      <DataTable
        title="Clients"
        data={clients}
        columns={columnData}
        filters={filterData}
        actions={actionData}
      />
    </div>
  );
}

export default Clients;
