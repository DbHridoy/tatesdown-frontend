import React from "react";
import CardData from "../../../Components/Dashboard/CardData";
import PipelineOverview from "../../../Components/Admin/Dashboard/PipelineOverview";
import PendingApprovals from "../../../Components/Dashboard/PendingApprovals";


const Dashboard = () => {
  return (
    <div>
      <CardData/>
      <PipelineOverview/>
      {/* <PendingApprovals/> */}
    </div>
  );
};

export default Dashboard;
