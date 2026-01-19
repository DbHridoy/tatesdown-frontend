import DashboardOverview from "../../../Components/Production-Manager/DashboardOverview/DashboardOverview";
import PipelineOverview from "../../../Components/Admin/Dashboard/PipelineOverview";
import { useGetMyStatsQuery } from "../../../redux/api/common";

const ProductionHome = () => {
  const { data, isLoading, isError } = useGetMyStatsQuery();
  const stats = data?.data;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <DashboardOverview
        isLoading={isLoading}
        error={isError ? "Failed to load stats" : ""}
        stats={stats}
      />
      <PipelineOverview />
    </div>
  );
};

export default ProductionHome;
