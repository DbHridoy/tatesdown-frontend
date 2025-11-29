import Filters from "../../UserComponents/Clients/Filters";
import ClientsTable from "../../UserComponents/Clients/ClientsTable";
function Clients() {
  return (
    <div>
      <div className="flex justify-between flex-row">
        <div>
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-gray-500">Overview of your clients</p>
        </div>
        <button className="bg-[#E6F2FA] text-gray-700 px-4 py-2 rounded">
          Add Client
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
