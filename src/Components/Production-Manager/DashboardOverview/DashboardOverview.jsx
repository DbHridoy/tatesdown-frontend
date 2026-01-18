import { Briefcase, Clock, Calendar, Hourglass } from "lucide-react";
import { useGetMyStatsQuery } from "../../../redux/api/common";

const DashboardOverview = ({
  title = "Dashboard Overview",
  subtitle = "Welcome back! Here's what's happening with your production jobs today.",
  isLoading = false,
  error = "",
  stats,
}) => {
  const overviewStats = [
    {
      id: 2,
      title: "Ready to Schedule",
      value: stats?.readyToScheduleCount ?? 0,
      icon: Clock,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Scheduled & Open",
      value: stats?.scheduledAndOpenCount ?? 0,
      icon: Calendar,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 4,
      title: "Pending Close",
      value: stats?.pendingCloseCount ?? 0,
      icon: Hourglass,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 5,
      title: "Cancelled",
      value: stats?.cancelledCount ?? 0,
      icon: Briefcase,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];


  if (error) {
    return (
      <div className="p-4 text-red-700 bg-red-50 border border-red-200 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon || Briefcase;

          return (
            <div
              key={stat.id ?? index}
              className="flex-1 
                         p-6 bg-white border border-gray-200 rounded-lg
                         shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 ${stat.bgColor || "bg-gray-50"
                  } rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon
                  className={`w-6 h-6 ${stat.iconColor || "text-gray-700"
                    }`}
                />
              </div>

              <h3 className="mb-1 text-sm font-medium text-gray-600">
                {stat.title}
              </h3>

              {isLoading ? (
                <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value ?? 0}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardOverview;
