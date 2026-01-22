function SalesRepHomeCards({ cards }) {



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl flex flex-col p-5 sm:p-6 items-center space-y-4"
        >
          <div className="bg-blue-100 p-3 flex items-center justify-center rounded-full">
            {card.icon}
          </div>

          <div className="text-center space-y-1">
            <p className="text-gray-500 text-sm">{card.title}</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-800">
              {card.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SalesRepHomeCards;
