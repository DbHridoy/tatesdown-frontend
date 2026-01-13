import React from "react";
import CardData from "../../../Components/Dashboard/CardData";
import PipelineOverview from "../../../Components/Admin/Dashboard/PipelineOverview";
import PendingApprovals from "../../../Components/Dashboard/PendingApprovals";
import SalesRepLeaderboard from "../../Common/SalesRepLeaderboard";


const Dashboard = () => {
  return (
    <div>
      <CardData/>
      <SalesRepLeaderboard/>
      <PipelineOverview/>
      {/* <PendingApprovals/> */}
    </div>
  );
};

export default Dashboard;
