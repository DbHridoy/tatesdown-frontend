function RecentActivity() {
  return (
    <div className="flex-1 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-3xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {/* Replace with icon */}
            <span>👤</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">John Doe</span>
            <span className="text-gray-500 text-sm">john@example.com</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span>👤</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Jane Smith</span>
            <span className="text-gray-500 text-sm">jane@example.com</span>
          </div>
        </div>

        {/* Add more activities here */}
      </div>
    </div>
  );
}

export default RecentActivity;
