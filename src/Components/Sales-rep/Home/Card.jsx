import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dollar01Icon,
  UserGroup02Icon,
  ChampionIcon,
  Briefcase03Icon,
} from "@hugeicons/core-free-icons";

function Card() {
  const cards = [
    { title: "Total sold", count: 1234, icon: Dollar01Icon },
    { title: "Active leads", count: 567, icon: UserGroup02Icon },
    // { title: "Leader board", count: 890, icon: ChampionIcon },
    { title: "Active jobs", count: 123, icon: Briefcase03Icon },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl flex flex-col p-6 items-center flex-1  space-y-4"
        >
          <div className="bg-blue-100 p-3 flex items-center justify-center rounded-full">
            <HugeiconsIcon icon={card.icon} />
          </div>

          <div className="text-center space-y-1">
            <p className="text-gray-500 text-sm">{card.title}</p>
            <p className="text-xl font-semibold text-gray-800">{card.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
