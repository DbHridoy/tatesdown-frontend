import DashboardOverview from "../../../Components/Production-Manager/DashboardOverview/DashboardOverview";
import PipelineOverview from "../../../Components/Admin/Dashboard/PipelineOverview";

const ProductionHome = () => {
  return (
    <div>
      <DashboardOverview />
      <PipelineOverview />
    </div>
  );
};

export default ProductionHome;
