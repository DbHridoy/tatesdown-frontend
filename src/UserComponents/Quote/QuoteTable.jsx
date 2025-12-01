import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const quotesData = [
  { id: 'Q1234', client: 'John Doe', price: '$1,500.00', date: '2025-11-20', status: 'Open' },
  { id: 'Q1234', client: 'Jane Smith', price: '$2,000.00', date: '2025-11-18', status: 'Accepted' },
  { id: 'Q1234', client: 'Mark Johnson', price: '$850.00', date: '2025-11-17', status: 'Open' },
  { id: 'Q1234', client: 'Mark Johnson', price: '$850.00', date: '2025-11-16', status: 'Accepted' },
  { id: 'Q1234', client: 'Sara Williams', price: '$1,750.00', date: '2025-11-15', status: 'Closed' },
];

const QuoteTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentQuotes = quotesData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <div className="bg-blue-100 p-4">
        <h2 className="text-xl font-semibold">Quotes Overview</h2>
      </div>

      <table className="min-w-full table-auto">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-4 py-2 text-left">Quote ID</th>
            <th className="px-4 py-2 text-left">Client Name</th>
            <th className="px-4 py-2 text-left">Estimated Price</th>
            <th className="px-4 py-2 text-left">Quote Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentQuotes.map((quote) => (
            <tr key={quote.id} className="border-t">
              <td className="px-4 py-2">{quote.id}</td>
              <td className="px-4 py-2">{quote.client}</td>
              <td className="px-4 py-2">{quote.price}</td>
              <td className="px-4 py-2">{quote.date}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    quote.status === 'Open'
                      ? 'bg-blue-500'
                      : quote.status === 'Accepted'
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {quote.status}
                </span>
              </td>
              <td onClick={() => navigate(`/quote-details`)} className="px-4 py-2">
                <button className="text-blue-500">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center py-4">
        <div className="text-sm text-gray-700">
          Showing {itemsPerPage * (currentPage - 1) + 1}-{Math.min(
            itemsPerPage * currentPage,
            quotesData.length
          )} of {quotesData.length} Quotes
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md text-gray-700 disabled:text-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(quotesData.length / itemsPerPage)}
            className="px-4 py-2 border rounded-md text-gray-700 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteTable;
