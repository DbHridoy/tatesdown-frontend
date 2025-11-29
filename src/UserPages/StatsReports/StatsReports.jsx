import React from 'react';

// Metrics Component
const Metrics = ({ leads, quotes, jobsBooked, jobsClosed, totalSales }) => (
  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
    {/* Total Leads */}
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-sm font-semibold text-gray-500">Total Leads</h3>
      <p className="text-2xl font-bold text-gray-800">{leads}</p>
    </div>
    {/* Total Quotes */}
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-sm font-semibold text-gray-500">Total Quotes</h3>
      <p className="text-2xl font-bold text-gray-800">{quotes}</p>
    </div>
    {/* Jobs Booked */}
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-sm font-semibold text-gray-500">Jobs Booked</h3>
      <p className="text-2xl font-bold text-gray-800">{jobsBooked}</p>
    </div>
    {/* Jobs Closed */}
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-sm font-semibold text-gray-500">Jobs Closed</h3>
      <p className="text-2xl font-bold text-gray-800">{jobsClosed}</p>
    </div>
    {/* Total Sales */}
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-sm font-semibold text-gray-500">Total Sales</h3>
      <p className="text-2xl font-bold text-gray-800">{totalSales}</p>
    </div>
  </div>
);

// Leaderboard Component
const Leaderboard = ({ leaderboard }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h3 className="text-2xl font-semibold mb-4">Leaderboard</h3>
    <ul className="space-y-4">
      {leaderboard.map((rep, index) => (
        <li key={index} className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-gray-800">{rep.rank}</span>
            <span className="text-sm text-gray-500">{rep.name}</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-gray-600">{rep.totalSales}</span>
            <span className="text-gray-600">{rep.jobsBooked} Jobs</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// Personal Metrics Component
const PersonalMetrics = ({ totalSold, totalPaid, bookingRate, progress }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h3 className="text-2xl font-semibold mb-4">Personal Metrics</h3>
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Total Sold</span>
        <span className="font-semibold text-gray-800">${totalSold}</span>
      </div>
      <div className="flex justify-between">
        <span>Total Paid</span>
        <span className="font-semibold text-gray-800">${totalPaid}</span>
      </div>
      <div className="flex justify-between">
        <span>Booking Rate</span>
        <span className="font-semibold text-gray-800">{bookingRate}%</span>
      </div>
      <div>
        <p className="text-sm">Progress to Goal</p>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Job Pipeline Component
const JobPipeline = ({ pipeline }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    {pipeline.map((status, index) => (
      <div
        key={index}
        className={`p-4 rounded-lg shadow-lg text-center ${status.color} text-white`}
      >
        <h4 className="text-xl font-semibold">{status.count}</h4>
        <p>{status.status}</p>
      </div>
    ))}
  </div>
);

// Main Dashboard Component
const StatsReports = () => {
  const leaderboardData = [
    { rank: 1, name: 'John Doe', totalSales: '$50,000', jobsBooked: 20 },
    { rank: 2, name: 'Sarah Lee', totalSales: '$40,000', jobsBooked: 15 },
    { rank: 3, name: 'Mike Johnson', totalSales: '$30,000', jobsBooked: 12 },
    { rank: 4, name: 'Emily Chen', totalSales: '$25,000', jobsBooked: 10 },
  ];

  const jobPipelineData = [
    { count: 10, status: 'DC Pending', color: 'bg-yellow-400' },
    { count: 10, status: 'DC Pending', color: 'bg-blue-400' },
    { count: 10, status: 'DC Pending', color: 'bg-green-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Metrics */}
      <Metrics leads={500} quotes={450} jobsBooked={300} jobsClosed={250} totalSales="$150k" />
      
      {/* Leaderboard */}
      <Leaderboard leaderboard={leaderboardData} />
      
      {/* Personal Metrics */}
      <PersonalMetrics totalSold={30000} totalPaid={10000} bookingRate={70} progress={75} />
      
      {/* Job Pipeline */}
      <JobPipeline pipeline={jobPipelineData} />
    </div>
  );
};

export default StatsReports;
