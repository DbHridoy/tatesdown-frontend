

import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import Filters from "../../../Components/Sales-rep/Clients/Filters";
import QuoteTable from "../../../Components/Sales-rep/Quote/QuoteTable";
function Quotes() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between flex-row ">
        <div>
          <h1 className="text-2xl font-bold">Quotes</h1>
          <p>Manage your quotes here</p>
        </div>
        <div className="flex flex-row gap-2 bg-primarycolor text-white p-4 rounded">
          <HugeiconsIcon icon={UserAdd01Icon} />
          <button
            className=" "
            onClick={() => navigate("/s/sales-rep/add-new-quote")}
          >
            Add Quote
          </button>
        </div>
      </div>
      <div className="py-4">
        <Filters />
      </div>
      <div className="py-4">
        <QuoteTable />
      </div>
    </div>
  );
}

export default Quotes;
