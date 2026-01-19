import React from "react";
import CardData from "../../../Components/Dashboard/CardData";
import PipelineOverview from "../../../Components/Admin/Dashboard/PipelineOverview";
import PendingApprovals from "../../../Components/Dashboard/PendingApprovals";
import SalesRepLeaderboard from "../../Common/SalesRepLeaderboard";
import { useGetMyStatsQuery } from "../../../redux/api/common";


const Dashboard = () => {
  const { data, isLoading, isError } = useGetMyStatsQuery();
  const stats = data?.data;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <CardData stats={stats} isLoading={isLoading} isError={isError} />
      <SalesRepLeaderboard/>
      <PipelineOverview/>
      {/* <PendingApprovals/> */}
    </div>
  );
};

export default Dashboard;
