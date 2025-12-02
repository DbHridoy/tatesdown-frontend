import React, { useState } from 'react';
import { ArrowLeft, Plus, Upload, ChevronDown, Edit } from 'lucide-react';
import { FaHourglass } from 'react-icons/fa';

export default function JobOverview() {
  const [currentStatus, setCurrentStatus] = useState('Scheduled & open');
  const [notes, setNotes] = useState('Filter, stain or refinish');
  const [designNotes, setDesignNotes] = useState('This is a sample note, and should never act as part of...');
  
  const progressPhotos = [
    { id: 1, src: null, placeholder: true },
    { id: 2, src: '/api/placeholder/150/100', placeholder: false },
    { id: 3, src: '/api/placeholder/150/100', placeholder: false }
  ];

  return (
    <div className="bg-white ">
      {/* Header */}
      <div className="px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Job Overview - J12345</h1>
            <p className="text-xs text-gray-500">View and Edit updated here only.</p>
          </div>
        </div>
      </div>

      <div className="p-6 ">
        {/* First Row - Job Overview & Job Status */}
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          {/* Job Overview */}
          <div className="p-5 bg-white border border-gray-300 rounded lg:col-span-2">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Job Overview</h2>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <p className="mb-1 text-xs text-gray-500">Job ID</p>
                <p className="text-sm font-medium text-gray-900">J12345</p>
              </div>
              
              <div>
                <p className="mb-1 text-xs text-gray-500">Client Name</p>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
              </div>
              
              <div>
                <p className="mb-1 text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900">North Shore</p>
              </div>
              
              <div>
                <p className="mb-1 text-xs text-gray-500">Job Status</p>
                <p className="text-sm font-medium text-gray-900">Scheduled & open</p>
              </div>
              
              <div>
                <p className="mb-1 text-xs text-gray-500">Job Date</p>
                <p className="text-sm font-medium text-gray-900">December 1, 2025</p>
              </div>
              
              <div>
                <p className="mb-1 text-xs text-gray-500">Total Price</p>
                <p className="text-sm font-medium text-gray-900">$5,000</p>
              </div>
            </div>
          </div>

          {/* Job Status Card */}
          <div className="p-5 bg-white border border-gray-300 rounded">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Job Status</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-xs text-gray-500">Current Status</label>
                <div className="relative">
                  <select 
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Scheduled & open</option>
                    <option>Ready to Schedule</option>
                    <option>Completed</option>
                    <option>Pending Close</option>
                  </select>
                  <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-xs text-gray-500">Job Status</label>
                <div className="relative">
                  <select 
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Ready to Schedule</option>
                  </select>
                  <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
                </div>
              </div>
              
              <button className="w-full flex justify-center  items-center gap-x-4 bg-yellow-400 hover:bg-yellow-500  font-medium py-2.5 rounded text-sm transition-colors">
                <FaHourglass/>
               <span className='text-gray-900'> Mark as pending close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Second Row - Notes & Progress Updates and Design Consultation */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Notes & Progress Updates */}
          <div className="p-5 bg-white border border-gray-300 rounded lg:col-span-2">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Notes & Progress Updates</h2>
            
            <div className="mb-4">
              <label className="block mb-2 text-xs text-gray-500">Add Notes</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter note or confirm"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                rows="2"
              />
            </div>
            
            <div className="flex gap-2 mb-5">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-[#B0D6F0]  rounded text-sm font-medium ">
                <Plus className="w-4 h-4" />
                Add Notes
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                Upload Photos
              </button>
            </div>
            
            <div className="mb-5">
              <h3 className="mb-2 text-xs font-semibold text-gray-900">Recent Notes</h3>
              <p className="text-xs text-gray-600">This is a sample note, and should never act as part of...</p>
            </div>
            
            <div>
              <h3 className="mb-3 text-xs font-semibold text-gray-900">Progress Photos</h3>
              <div className="grid grid-cols-3 gap-3">
                {progressPhotos.map((photo) => (
                  <div key={photo.id} className="flex items-center justify-center overflow-hidden bg-gray-100 border border-gray-200 rounded aspect-video">
                    {photo.placeholder ? (
                      <Plus className="w-6 h-6 text-gray-400" />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Design Consultation */}
          <div className="space-y-4">
            <div className="p-5 bg-white border border-gray-300 rounded">
              <h2 className="mb-4 text-base font-semibold text-gray-900">Design Consultation</h2>
              
              <div className="mb-5 space-y-3 text-xs">
                <div>
                  <p className="text-gray-500 mb-0.5">General Refusal Reason</p>
                  <p className="font-medium text-gray-900">Expected Delays</p>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-0.5">Scheduled Date</p>
                  <p className="font-medium text-gray-900">(912) 555 - 1490 5789</p>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-0.5">Minimum Pieces</p>
                  <p className="font-medium text-gray-900">10 pieces</p>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-0.5">Additional Pic needed</p>
                  <p className="font-medium text-gray-900">Yes</p>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-0.5">Client Dates</p>
                  <p className="font-medium text-gray-900">6 Month</p>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-0.5">Client Sign</p>
                  <p className="font-medium text-gray-900">Lorem Ipsum</p>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-0.5">Call Back</p>
                  <p className="font-medium text-gray-900">December 1, 2025</p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-xs text-gray-500">Design Notes</label>
                <textarea 
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                />
              </div>
              
              <button className="w-full flex justify-center gap-x-4 items-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2.5 rounded text-sm transition-colors">
                <Edit/>
                <span>Update design Consultation</span>
              </button>
            </div>
            
            <button className="w-full bg-[#007CCD]  text-white font-medium py-2.5 rounded text-sm transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}