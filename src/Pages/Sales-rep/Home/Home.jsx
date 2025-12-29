import Card from "../../../Components/Sales-rep/Home/Card";
import Pipeline from "../../../Components/Sales-rep/Home/Pipeline";
const Home = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Sales Dashboard</h1>
        <p className="text-gray-500">Overview of your sales performance</p>
      </div>
      {/* Cards overview */}
      <Card />

      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Pipeline />
        </div>
      </div>
    </>
  );
};

export default Home;
