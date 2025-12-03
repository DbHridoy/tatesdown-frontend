function Filters() {
  const filters = [
    {
      label: "Lead Source",
      options: [
        { value: "", label: "Select" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
    {
      label: "Call Status",
      options: [
        { value: "", label: "Select" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
    {
      label: "Lead Rating",
      options: [
        { value: "", label: "Select" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
    {
      label: "Cluster",
      options: [
        { value: "", label: "Select" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
    {
      label: "Date Range",
      options: [
        { value: "", label: "Select" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
  ];

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Filters</h1>
        <p className="text-blue-500 cursor-pointer">See all</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {filters.map((filter, index) => (
          <div key={index} className="flex flex-col flex-1 min-w-[150px]">
            <label className="text-gray-600 text-sm mb-1">{filter.label}</label>
            <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {filter.options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
