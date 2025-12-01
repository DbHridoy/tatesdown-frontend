import Filters from "../../UserComponents/Clients/Filters";
import ClientsTable from "../../UserComponents/Clients/ClientsTable";
import { useNavigate } from "react-router-dom";
function Quotes() {
  const navigate=useNavigate()
  return (
    <div>
      <div className="flex justify-between flex-row ">
        <div>

        <h1 className="text-2xl font-bold">Quotes</h1>
        <p>Manage your quotes here</p>
        </div>
        <button 
          className="bg-primarycolor text-white px-4 py-2 rounded"
          onClick={() => navigate('/add-new-quote')}
        >
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
