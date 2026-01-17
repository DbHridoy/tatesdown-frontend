import Pipeline from "../../../Components/Sales-rep/Home/Pipeline";
import SalesRepHomeCards from "../../../Components/Sales-rep/Home/SalesRepHomeCards";
import SalesRepLeaderboard from "../../Common/SalesRepLeaderboard";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slice/authSlice";
import {
  Dollar01Icon,
  UserGroup02Icon,
  ChampionIcon,
  Briefcase03Icon,
} from "@hugeicons/core-free-icons";
import { useGetMeQuery } from "../../../redux/api/userApi";
import { useGetMyStatsQuery } from "../../../redux/api/common";
const SalesRepHome = () => {
  const { data: userData, isLoading } = useGetMeQuery();
  const { data: myStats } = useGetMyStatsQuery()
  const user = userData?.data;
  const cards = [
    {
      title: "Total sold",
      count: myStats?.data?.totalSold || 0,
      icon: Dollar01Icon,
    },
    {
      title: "Total clients",
      count: myStats?.data?.totalClients || 0,
      icon: UserGroup02Icon,
    },
    {
      title: "Total quotes",
      count: myStats?.data?.totalQuotes || 0,
      icon: ChampionIcon,
    },
    {
      title: "Total jobs",
      count: myStats?.data?.totalJobs || 0,
      icon: Briefcase03Icon,
    },
  ];
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Sales Dashboard</h1>
        <p className="text-gray-500">Overview of your sales performance</p>
      </div>
      {/* Cards overview */}
      <SalesRepHomeCards cards={cards} />
      <SalesRepLeaderboard />

      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Pipeline data={cards} />
        </div>
      </div>
    </>
  );
};

export default SalesRepHome;
