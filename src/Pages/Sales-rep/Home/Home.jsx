import Card from "../../../Components/Sales-rep/Home/Card";
import QuickActions from "../../../Components/Sales-rep/Home/QuickActions";
import Pipeline from "../../../Components/Sales-rep/Home/Pipeline";
import RecentActivity from "../../../Components/Sales-rep/Home/RecentActivity";
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
