import React, { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobScheduling = () => {
  const [location, setLocation] = useState("All Locations");
  const [cluster, setCluster] = useState("All Cluster");
  const [status, setStatus] = useState("All Statuses");
  const navigate = useNavigate();
  const allJobs = [
    {
      id: "J12345",
      clientName: "John Doe",
      location: "North Shore",
      cluster: "Cluster A",
      status: "Ready to Schedule",
    },
    {
      id: "J12346",
      clientName: "Sarah Williams",
      location: "South Shore",
      cluster: "Cluster B",
      status: "Scheduled",
    },
    {
      id: "J12347",
      clientName: "Michael Brown",
      location: "North Shore",
      cluster: "Cluster A",
      status: "Ready to Schedule",
    },
    {
      id: "J12348",
      clientName: "Emily Davis",
      location: "East Shore",
      cluster: "Cluster C",
      status: "Completed",
    },
    {
      id: "J12349",
      clientName: "David Wilson",
      location: "South Shore",
      cluster: "Cluster B",
      status: "Ready to Schedule",
    },
    {
      id: "J12350",
      clientName: "Lisa Anderson",
      location: "North Shore",
      cluster: "Cluster A",
      status: "Scheduled",
    },
  ];

  // Dynamic filtering
  const filteredJobs = allJobs.filter((job) => {
    const locationMatch =
      location === "All Locations" || job.location === location;
    const clusterMatch = cluster === "All Cluster" || job.cluster === cluster;
    const statusMatch = status === "All Statuses" || job.status === status;

    return locationMatch && clusterMatch && statusMatch;
  });

  // Get unique values for dropdowns
  const locations = [
    "All Locations",
    ...new Set(allJobs.map((job) => job.location)),
  ];
  const clusters = [
    "All Cluster",
    ...new Set(allJobs.map((job) => job.cluster)),
  ];
  const statuses = [
    "All Statuses",
    ...new Set(allJobs.map((job) => job.status)),
  ];

  const clearFilters = () => {
    setLocation("All Locations");
    setCluster("All Cluster");
    setStatus("All Statuses");
  };

  return (
    <div className="p-6 mx-auto ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Scheduling</h1>
        <p className="text-sm text-gray-600">Production Manager</p>
      </div>

      {/* Filters */}
      <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Cluster
            </label>
            <div className="relative">
              <select
                value={cluster}
                onChange={(e) => setCluster(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {clusters.map((clust) => (
                  <option key={clust} value={clust}>
                    {clust}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="flex items-end gap-3">
              <div className="relative flex-1">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map((stat) => (
                    <option key={stat} value={stat}>
                      {stat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredJobs.length} of {allJobs.length} jobs
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                Job ID
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                Client Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                Job Status
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {job.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {job.clientName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-sm font-medium rounded ${
                        job.status === "Ready to Schedule"
                          ? "bg-blue-100 text-blue-700"
                          : job.status === "Scheduled"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/s/production-manager/job-scheduling/${job.id}`)}
                        className="px-4 py-2 font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Job Detail
                      </button>
                      <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Mark as Scheduled
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No jobs found matching the selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Load More Button */}
        {filteredJobs.length > 0 && (
          <div className="p-4 text-center border-t border-gray-200">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Load more jobs
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default JobScheduling;
