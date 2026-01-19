import Pipeline from "../../../Components/Sales-rep/Home/Pipeline";
import SalesRepHomeCards from "../../../Components/Sales-rep/Home/SalesRepHomeCards";
import DataTable from "../../../Components/Common/DataTable";
import PeriodFilter from "../../../Components/Common/PeriodFilter";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slice/authSlice";
import {
  Dollar01Icon,
  UserGroup02Icon,
  ChampionIcon,
  Briefcase03Icon,
} from "@hugeicons/core-free-icons";
import { useGetMeQuery } from "../../../redux/api/userApi";
import { useGetLeaderBoardQuery, useGetMyStatsQuery } from "../../../redux/api/common";
import { getDefaultPeriodInput, normalizePeriodDate } from "../../../utils/period";
import { useState } from "react";
const SalesRepHome = () => {
  const { data: userData, isLoading } = useGetMeQuery();
  const [statsPeriodType, setStatsPeriodType] = useState("month");
  const [statsDateInput, setStatsDateInput] = useState(
    getDefaultPeriodInput("month")
  );
  const [leaderboardPeriodType, setLeaderboardPeriodType] = useState("day");
  const { data: myStats } = useGetMyStatsQuery({
    periodType: statsPeriodType,
    date: normalizePeriodDate(statsPeriodType, statsDateInput),
  });
  const { data: leaderBoardData } = useGetLeaderBoardQuery({
    periodType: leaderboardPeriodType,
  });
  const user = userData?.data;
  const cards = [
    {
      title: "Total sold",
      count: myStats?.data?.totalSold || 0,
      icon: Dollar01Icon,
    },
    {
      title: "Total clients",
      count: myStats?.data?.totalClients || 0,
      icon: UserGroup02Icon,
    },
    {
      title: "Total quotes",
      count: myStats?.data?.totalQuotes || 0,
      icon: ChampionIcon,
    },
    {
      title: "Total jobs",
      count: myStats?.data?.totalJobs || 0,
      icon: Briefcase03Icon,
    },
  ];
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
    <>
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          Sales Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Overview of your sales performance
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">
        <div className="text-sm text-gray-500">
          Filter stats by period
        </div>
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

      {/* Cards overview */}
      <SalesRepHomeCards cards={cards} />
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

      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Pipeline data={cards} />
        </div>
      </div>
    </>
  );
};

export default SalesRepHome;
