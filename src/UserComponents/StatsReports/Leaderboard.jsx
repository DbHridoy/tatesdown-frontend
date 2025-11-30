const Leaderboard = () => {
  const data = [
    {
      rank: 1,
      name: "John Doe",
      sales: "$50,000",
      jobs: 20,
      profilePic: "/path-to-john-profile.jpg",
    },
    {
      rank: 2,
      name: "Sarah Lee",
      sales: "$40,000",
      jobs: 15,
      profilePic: "/path-to-sarah-profile.jpg",
    },
    {
      rank: 3,
      name: "Mike Johnson",
      sales: "$30,000",
      jobs: 12,
      profilePic: "/path-to-mike-profile.jpg",
    },
    {
      rank: 4,
      name: "Emily Chen",
      sales: "$25,000",
      jobs: 10,
      profilePic: "/path-to-emily-profile.jpg",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Leaderboard</h2>
        <div className="flex items-center space-x-2">
          <span className="">🏆</span>
        </div>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Rank
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Sales Rep
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Total Sales
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Jobs Booked
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className={`border-b `}>
              <td className="py-2 px-4 text-sm text-gray-700">{entry.rank}</td>
              <td className="py-2 px-4 flex items-center space-x-2">
                <img
                  src={entry.profilePic}
                  alt={entry.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-800 font-medium">
                  {entry.name}
                </span>
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">{entry.sales}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{entry.jobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
