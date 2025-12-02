import React from "react";
import RecentJobActivity from "../../../Components/Production-Manager/RecentJobActivity/RecentJobActivity";
import DashboardOverview from "../../../Components/Production-Manager/DashboardOverview/DashboardOverview";

const ProductionHome = () => {
  return (
    <div>
      <DashboardOverview />
      <RecentJobActivity />
    </div>
  );
};

export default ProductionHome;
