import { HugeiconsIcon } from "@hugeicons/react";

function SalesRepHomeCards({ cards }) {



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

export default SalesRepHomeCards;
