import Filters from "../../UserComponents/Clients/Filters";
import ClientsTable from "../../UserComponents/Clients/ClientsTable";
function Quotes() {
  return (
    <div>
      <div className="flex justify-between flex-row ">
        <h1>Quotes</h1>
        <button className="bg-primarycolor text-white px-4 py-2 rounded">
          Add Quote
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

export default Quotes;
