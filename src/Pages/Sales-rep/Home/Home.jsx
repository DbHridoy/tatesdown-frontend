import Pipeline from "../../../Components/Sales-rep/Home/Pipeline";
import SalesRepHomeCards from "../../../Components/Sales-rep/Home/SalesRepHomeCards";
const Home = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Sales Dashboard</h1>
        <p className="text-gray-500">Overview of your sales performance</p>
      </div>
      {/* Cards overview */}
      <SalesRepHomeCards />

      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Pipeline />
        </div>
      </div>
    </>
  );
};

export default Home;
