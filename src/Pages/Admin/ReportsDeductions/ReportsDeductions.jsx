import React, { useMemo, useState } from "react";
import ReportsData from "../../../Components/Dashboard/ReportsData";
import PerRepReporting from "../../../Components/Dashboard/PerRepReporting";

const ReportsDeductions = () => {
  const [filters, setFilters] = useState({
    salesRep: "All Sales Reps",
    status: "All Statuses",
    timeRange: "All Time Ranges",
    cluster: "All Clusters",
  });

  // Example data (you can replace this with real data from an API or prop)
  const data = [
    {
      salesRep: "Rep A",
      status: "New",
      startDate: "2025/01/01",
      cluster: "North Shore",
    },
    {
      salesRep: "Rep B",
      status: "In progress",
      startDate: "2025/02/01",
      cluster: "Inner West",
    },
    {
      salesRep: "Rep A",
      status: "Completed",
      startDate: "2025/03/01",
      cluster: "Eastern Suburbs",
    },
    // Add more data as needed
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        (filters.salesRep === "All Sales Reps" ||
          item.salesRep === filters.salesRep) &&
        (filters.status === "All Statuses" || item.status === filters.status) &&
        (filters.timeRange === "All Time Ranges" ||
          item.startDate >= "2025/01/01") &&
        (filters.cluster === "All Clusters" || item.cluster === filters.cluster)
      );
    });
  }, [filters, data]);

  // Pagination calculation
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle filter change
  const handleFilterChange = (e, filterName) => {
    setFilters({ ...filters, [filterName]: e.target.value });
    setCurrentPage(1); 
  };

  return (
    <div>
      <div className="p-6 mt-5 mb-2 border rounded-lg shadow-sm">
        <div className="flex justify-between mb-4 ">
          <div>
            <h3 className="mb-4 font-semibold">Filters</h3>
          </div>
          <div>
            <button
              className="text-blue-500"
              onClick={() =>
                setFilters({
                  salesRep: "All Sales Reps",
                  status: "All Statuses",
                  timeRange: "All Time Ranges",
                  cluster: "All Clusters",
                })
              }
            >
              Reset All
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-[16px] mb-2"> Sales Rep</p>
            <select
              value={filters.salesRep}
              onChange={(e) => handleFilterChange(e, "salesRep")}
              className="px-4 py-2 border rounded-md"
            >
              <option>All Representatives</option>
              <option>Rep A</option>
              <option>Rep B</option>
              <option>Rep C</option>
            </select>
          </div>

          <div>
            <p className="text-[16px] mb-2"> Time Range</p>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange(e, "status")}
              className="p-2 border rounded-md"
            >
              <option>This Month</option>
              <option>New</option>
              <option>In progress</option>
              <option>Closed</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <p className="text-[16px] mb-2"> Cluster</p>
            <select
              value={filters.cluster}
              onChange={(e) => handleFilterChange(e, "cluster")}
              className="p-2 border rounded-md"
            >
              <option>All Clusters</option>
              <option>North Shore</option>
              <option>Inner West</option>
              <option>Eastern Suburbs</option>
            </select>
          </div>

          <div>
            Apply Filter
          </div>
        </div>
      </div>
      <ReportsData />
      <PerRepReporting/>
    </div>
  );
};

export default ReportsDeductions;
