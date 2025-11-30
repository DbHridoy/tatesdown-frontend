import Filters from "../../UserComponents/Clients/Filters";
import JobTable from "../../UserComponents/Jobs/JobTable";
import { useNavigate } from "react-router-dom";
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
          className="bg-primarycolor text-white px-4 py-2 rounded"
          onClick={() => navigate("/add-new-job")}
        >
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
