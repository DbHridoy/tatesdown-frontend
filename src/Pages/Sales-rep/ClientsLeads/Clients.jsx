import Filters from "../../../Components/Sales-rep/Clients/Filters";
import ClientsTable from "../../../Components/Sales-rep/Clients/ClientsTable";
import { AddTeamIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useNavigate } from 'react-router-dom';
function Clients() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between flex-row">
        <div>
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-gray-500">Overview of your clients</p>
        </div>
        <button onClick={()=>navigate("/add-client")} className="bg-[#E6F2FA] text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
       <HugeiconsIcon icon={AddTeamIcon} />  <span>Add Client</span>
        </button>
      </div>
      <div className="py-4">
        <Filters />
      </div>
      <div className="py-4">
        <ClientsTable />
      </div>
    </div>
  );
}

export default Clients;
