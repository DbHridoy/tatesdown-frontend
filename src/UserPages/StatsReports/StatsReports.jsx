import React from "react";
import Card from "../../UserComponents/Home/Card";
import QuickActions from "../../UserComponents/Home/QuickActions";
import RecentActivity from "../../UserComponents/Home/RecentActivity";
import Pipeline from "../../UserComponents/Home/Pipeline";
function StatsReports() {
  const cards = [
    { title: "Total Users", count: 1234, icon: "users" },
    { title: "Total Quotes", count: 567, icon: "quotes" },
    { title: "Total Jobs", count: 890, icon: "jobs" },
    { title: "Total Expenses", count: 123, icon: "expenses" },
  ];
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Sales Dashboard</h1>
        <p className="text-gray-500">Overview of your sales performance</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            count={card.count}
            icon={card.icon}
          />
        ))}
      </div>
      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* recent activity */}
          <RecentActivity />

          {/* pipeline */}

          <Pipeline />
        </div>
      </div>
      <QuickActions />
    </div>
  );
}

export default StatsReports;
