import Filters from "../../UserComponents/Clients/Filters";
import ClientsTable from "../../UserComponents/Clients/ClientsTable";
function Jobs() {
  return (
    <div>
      <div className="flex justify-between flex-row">
        <h1>Jobs</h1>
        <button className="bg-primarycolor text-white px-4 py-2 rounded">
          Add Job
        </button>
      </div>
      <Filters />
      <ClientsTable />
    </div>
  );
}

export default Jobs;
