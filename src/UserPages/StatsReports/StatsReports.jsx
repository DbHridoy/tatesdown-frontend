import StatsCard from "../../UserComponents/StatsReports/StatsCard";
import Leaderboard from "../../UserComponents/StatsReports/Leaderboard";
import PersonalMetrics from "../../UserComponents/StatsReports/PersonalMetrics";
import JobPipeline from "../../UserComponents/StatsReports/JobPipeline";

const StatsReports = () => {
  return (
    <div className="mx-auto p-6 space-y-6">

      {/* 1. Stats Card */}
      <StatsCard />

      {/* 2. Leaderboard + Personal Metrics in same row with equal height */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="flex-1">
          <Leaderboard />
        </div>
        <div className="flex-1">
          <PersonalMetrics />
        </div>
      </div>

      {/* 3. Job Pipeline */}
      <JobPipeline />
    </div>
  );
};

export default StatsReports;
