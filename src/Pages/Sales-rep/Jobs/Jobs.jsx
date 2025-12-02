

import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import Filters from "../../../Components/Sales-rep/Clients/Filters";
import JobTable from "../../../Components/Sales-rep/Jobs/JobTable";
function Jobs() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
          <p className="text-gray-600">Manage your jobs and track progress</p>
        </div>
        <button
          className="bg-primarycolor text-white flex flex-row items-center p-4 rounded"
          onClick={() => navigate("/add-new-job")}
        >
          <HugeiconsIcon icon={UserAdd01Icon} />
          Add Job
        </button>
      </div>
      <div className="space-y-4">
        <Filters />
        <JobTable />
      </div>
    </div>
  );
}

export default Jobs;
