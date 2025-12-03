import { AddTeamIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import Filters from "../../../Components/Sales-rep/Clients/Filters";
import ClientsTable from "../../../Components/Sales-rep/Clients/ClientsTable";

function Clients() {
  const navigate = useNavigate();

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
      <div className="mb-4 md:mb-6">
        <Filters />
      </div>

      {/* Clients Table */}
      <ClientsTable />
    </div>
  );
}

export default Clients;
