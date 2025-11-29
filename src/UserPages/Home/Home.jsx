import Card from "../../UserComponents/Home/Card";
import QuickActions from "../../UserComponents/Home/QuickActions";
import Pipeline from "../../UserComponents/Home/Pipeline";
import RecentActivity from "../../UserComponents/Home/RecentActivity";
const Home = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Sales Dashboard</h1>
        <p className="text-gray-500">Overview of your sales performance</p>
      </div>
      {/* Cards overview */}
      <Card />
      {/* quick actions */}
      <QuickActions />
      {/* bottom */}
      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* recent activity */}
          <RecentActivity />
          {/* pipeline */}
          <Pipeline />
        </div>
      </div>
    </>
  );
};

export default Home;
