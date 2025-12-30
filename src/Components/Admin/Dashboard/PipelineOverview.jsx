import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useGetAdminStatsQuery } from "../../../redux/api/statsApi";

export default function PipelineOverview() {
  const { data: adminStatsData } = useGetAdminStatsQuery();
  const adminStats = adminStatsData?.data || {};
  const data = [
    { name: "New Leads", value: adminStats?.totalLeads || 0, color: "#0EA5E9" },
    { name: "Quotes", value: adminStats?.totalQuotes || 0, color: "#7DD3FC" },
    { name: "Dc Pending", value: adminStats?.dcPending || 0, color: "#F59E0B" },
    {
      name: "Ready",
      value: adminStats?.readyToSchedule || 0,
      color: "#FCD34D",
    },
    {
      name: "Scheduled",
      value: adminStats?.scheduledOpen || 0,
      color: "#8B5CF6",
    },
    { name: "Closed", value: adminStats?.closedJobs || 0, color: "#6B7280" },
  ];

  return (
    <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div>
        <h1 className="mb-1 text-2xl font-semibold text-gray-900">
          Pipeline Overview
        </h1>
        <p className="mb-2 text-sm text-gray-600">Job status progression</p>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              ticks={[0, 50, 100, 150]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
