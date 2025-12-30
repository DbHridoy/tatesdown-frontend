import React from 'react';
import { Briefcase, Clock, Calendar, Hourglass } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Jobs',
      value: '150',
      icon: Briefcase,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Ready to Schedule',
      value: '5',
      icon: Clock,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 3,
      title: 'Scheduled & Open',
      value: '7',
      icon: Calendar,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 4,
      title: 'Pending Close',
      value: '3',
      icon: Hourglass,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    <div >
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your production jobs today.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.id} 
              className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              
              <h3 className="mb-1 text-sm font-medium text-gray-600">
                {stat.title}
              </h3>
              
              <p className="text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardOverview;