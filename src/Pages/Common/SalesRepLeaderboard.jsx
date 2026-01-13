import React from "react";
import { useGetLeaderBoardQuery } from "../../redux/api/common";

function SalesRepLeaderboard() {
  const { data: leaderBoardData, isLoading } = useGetLeaderBoardQuery();
  const leaderBoard = leaderBoardData?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold">Sales Rep Leaderboard</h2>
      <p className="text-lg text-gray-500 mb-4">Top 5 Sales Reps</p>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">#</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Total Clients</th>
            <th className="border px-4 py-2 text-left">Total Quotes</th>
            <th className="border px-4 py-2 text-left">Total Sold</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard.map((rep, index) => (
            <tr key={rep._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{rep.userId.fullName}</td>
              <td className="border px-4 py-2">{rep.totalClients}</td>
              <td className="border px-4 py-2">{rep.totalQuotes}</td>
              <td className="border px-4 py-2">{rep.totalSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesRepLeaderboard;
