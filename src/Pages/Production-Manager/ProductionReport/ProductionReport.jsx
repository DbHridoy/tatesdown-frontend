import React from "react";
import PipelineOverview from "../../../Components/Dashboard/PipelineOverview";
import ReportCard from "../../../Components/Production-Manager/ReportCard/ReportCard";

const ProductionReport = () => {
  return (
    <div className="space-y-2">
      <ReportCard />
      <PipelineOverview />
    </div>
  );
};

export default ProductionReport;
