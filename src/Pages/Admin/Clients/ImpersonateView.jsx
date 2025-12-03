import React from 'react';
import { LuEye } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const ImpersonateView = () => {
  const navigate = useNavigate();
  // Mock data for leads
  const leads = [
    {
      id: 1,
      leadName: 'Tech Solutions Inc.',
      clientInfo: '555-12345\njohn.rub@gmail.com',
      status: 'New Mail',
      value: '$45,000',
      lastContact: '2 hours ago',
      description: '122 min (5, spring)'
    },
    {
      id: 2,
      leadName: 'Tech Solutions Inc.',
      clientInfo: '555-12345\njohn.rub@gmail.com',
      status: 'In Progress',
      value: '$45,000',
      lastContact: '2 hours ago',
      description: '123 min (5, spring)'
    },
    {
      id: 3,
      leadName: 'Tech Solutions Inc.',
      clientInfo: '555-12345\njohn.rub@gmail.com',
      status: 'Negotiation',
      value: '$45,000',
      lastContact: '2 hours ago',
      description: '123 min (5, spring)'
    },
    {
      id: 4,
      leadName: 'Tech Solutions Inc.',
      clientInfo: '555-12345\njohn.rub@gmail.com',
      status: 'New Mail',
      value: '$45,000',
      lastContact: '2 hours ago',
      description: '123 min (5, spring)'
    }
  ];

  const handleExitImpersonation = () => {
    console.log('Exiting impersonation mode');
    navigate('/s/admin/clients');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Mail':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Impersonate View</h1>
      
      {/* User Info Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Michael Chen</h2>
        <p className="text-gray-600">Senior Sales Representative</p>
        <p className="text-gray-600">releases.com@campus.com</p>
        <p className="text-gray-600">+1 (0) 02 123- 5677</p>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* Additional Leads Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Leads</h3>
        
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.leadName}</div>
                      <div className="text-sm text-gray-500">{lead.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 space-y-1">
                      {lead.clientInfo.split('\n').map((line, index) => (
                        <div key={index} className="font-mono">{line}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <LuEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* Exit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleExitImpersonation}
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Exit Impersonation
        </button>
      </div>
    </div>
  );
};

export default ImpersonateView;