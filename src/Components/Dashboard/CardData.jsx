import { User } from 'lucide-react';

const CardData = () => {


  const data = [
    { title: 'Total Leads', value: '0', change: '+12%', color: 'text-green-500' },
    { title: 'Total Quotes', value: '0', change: '+8%', color: 'text-green-500' },
    { title: 'Booked Jobs', value: '0', change: '-3%', color: 'text-red-500' },
    { title: 'DC Pending', value: '0', change: 'Pending', color: 'text-yellow-500' },
    { title: 'Ready to Schedule', value: '0', change: '', color: 'text-green-500' },
    { title: 'Scheduled & Open', value: '0', change: '', color: 'text-gray-500' },
    { title: 'Closed Jobs', value: '0', change: '', color: 'text-blue-500' },
    { title: 'Total Produced for Revenue', value: '$0', change: '', color: 'text-blue-500' },
  ];

  return (
    <div className="p-6">
      {/* Filter Bar */}
      {/* <div className="flex items-center gap-4 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors ${
              activeFilter === filter
                ? ' text-black border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div> */}

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between p-6 rounded-lg shadow-md ${index === data.length - 1 ? '!bg-[#B0D6F0]' : 'bg-white'
              }`}
          >
            <div>
              <div className="w-[52px] h-[52px] flex items-center justify-center bg-blue-100 rounded-lg mb-4">
                <User />
              </div>
              <div className="text-sm text-gray-500">{item.title}</div>
              <div className="mt-2 text-xl font-bold">{item.value}</div>
            </div>
            <div>
              {item.change && (
                <div className={`mt-1 text-sm ${item.color}`}>
                  {item.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardData;
