import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PipelineOverview = ()  =>{
  const data = [
    { name: "New Leads", value: 150, color: "#007bdb" },
    { name: "Quotes", value: 115, color: "#b7dbff" },
    { name: "Dc Pending", value: 35, color: "#f1a10a" },
    { name: "Ready", value: 28, color: "#caa20d" },
    { name: "Scheduled", value: 50, color: "#7066ff" },
    { name: "Closed", value: 42, color: "#626672" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow border w-full">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">
        Pipeline Overview
      </h2>
      <p className="text-sm text-gray-500 mb-5">Job status progression</p>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={25}>
            <CartesianGrid stroke="#e5e7eb" horizontal={true} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#000" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#000" }}
            />
            <Tooltip />
            {data.map((entry, index) => (
              <Bar
                key={index}
                dataKey="value"
                fill={entry.color}
                name={entry.name}
                stackId={entry.name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PipelineOverview;
