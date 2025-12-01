import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const pipelineData = [
  { stage: "Lead", value: 40 },
  { stage: "Contacted", value: 30 },
  { stage: "Proposal", value: 20 },
  { stage: "Negotiation", value: 10 },
  { stage: "Closed", value: 5 },
];

function Pipeline() {
  return (
    <div className="flex-1 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-3xl font-semibold mb-4">Pipeline Overview</h2>

      <div className="bg-white rounded-xl p-2 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={pipelineData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="stage" />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Pipeline;
