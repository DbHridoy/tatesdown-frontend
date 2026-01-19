import React, { useState } from "react";
import CardData from "../../../Components/Dashboard/CardData";
import PipelineOverview from "../../../Components/Admin/Dashboard/PipelineOverview";
import PendingApprovals from "../../../Components/Dashboard/PendingApprovals";
import DataTable from "../../../Components/Common/DataTable";
import PeriodFilter from "../../../Components/Common/PeriodFilter";
import { useGetLeaderBoardQuery, useGetMyStatsQuery } from "../../../redux/api/common";
import { getDefaultPeriodInput, normalizePeriodDate } from "../../../utils/period";


const Dashboard = () => {
  const [statsPeriodType, setStatsPeriodType] = useState("month");
  const [statsDateInput, setStatsDateInput] = useState(
    getDefaultPeriodInput("month")
  );
  const [leaderboardPeriodType, setLeaderboardPeriodType] = useState("day");
  const { data, isLoading, isError } = useGetMyStatsQuery({
    periodType: statsPeriodType,
    date: normalizePeriodDate(statsPeriodType, statsDateInput),
  });
  const { data: leaderBoardData } = useGetLeaderBoardQuery({
    periodType: leaderboardPeriodType,
  });
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
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="text-sm text-gray-500">Filter stats by period</div>
        <PeriodFilter
          periodType={statsPeriodType}
          dateValue={statsDateInput}
          onPeriodTypeChange={(value) => {
            setStatsPeriodType(value);
            setStatsDateInput(getDefaultPeriodInput(value));
          }}
          onDateChange={setStatsDateInput}
        />
      </div>
      <CardData stats={stats} isLoading={isLoading} isError={isError} />
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Sales Rep Leaderboard
        </h2>
        <PeriodFilter
          label="Leaderboard"
          periodType={leaderboardPeriodType}
          showDate={false}
          onPeriodTypeChange={setLeaderboardPeriodType}
        />
      </div>
      <DataTable
        title=""
        data={leaderboardRows.map((row) => ({
          ...row,
          revenueEarned: formatCurrency(row.revenueEarned),
          revenueProduced: formatCurrency(row.revenueProduced),
        }))}
        config={{ ...leaderboardConfig, showSearch: false, filters: [] }}
      />
      <PipelineOverview />
      {/* <PendingApprovals/> */}
    </div>
  );
};

export default Dashboard;
