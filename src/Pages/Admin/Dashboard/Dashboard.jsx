import React from "react";
import CardData from "../../../Components/Dashboard/CardData";
import PipelineOverview from "../../../Components/Admin/Dashboard/PipelineOverview";
import PendingApprovals from "../../../Components/Dashboard/PendingApprovals";
import DataTable from "../../../Components/Common/DataTable";
import { useGetLeaderBoardQuery, useGetMyStatsQuery } from "../../../redux/api/common";


const Dashboard = () => {
  const { data, isLoading, isError } = useGetMyStatsQuery();
  const { data: leaderBoardData } = useGetLeaderBoardQuery();
  const stats = data?.data;
  const leaderBoard = leaderBoardData?.data || [];
  const leaderboardRows = leaderBoard.map((rep) => ({
    id: rep._id,
    name: rep.user?.fullName || rep.userId?.fullName || "N/A",
    totalClients: rep.totalClients,
    totalQuotes: rep.totalQuotes,
    totalJobs: rep.totalJobs,
    revenueEarned: rep.totalRevenueSold,
    revenueProduced: rep.totalRevenueProduced,
  }));
  const formatCurrency = (value) => {
    const amount = Number(value) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const leaderboardConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Name", accessor: "name" },
      { label: "Total Clients", accessor: "totalClients" },
      { label: "Total Quotes", accessor: "totalQuotes" },
      { label: "Total Jobs", accessor: "totalJobs" },
      { label: "Revenue Earned", accessor: "revenueEarned" },
      { label: "Revenue Produced", accessor: "revenueProduced" },
    ],
    totalItems: leaderboardRows.length,
    currentPage: 1,
    itemsPerPage: Math.max(leaderboardRows.length, 1),
    sortKey: "",
    sortOrder: "asc",
    onPageChange: () => { },
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <CardData stats={stats} isLoading={isLoading} isError={isError} />
      <DataTable
        title="Sales Rep Leaderboard"
        data={leaderboardRows.map((row) => ({
          ...row,
          revenueEarned: formatCurrency(row.revenueEarned),
          revenueProduced: formatCurrency(row.revenueProduced),
        }))}
        config={leaderboardConfig}
      />
      <PipelineOverview />
      {/* <PendingApprovals/> */}
    </div>
  );
};

export default Dashboard;
