import React, { useState } from 'react';

const SharedNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      user: 'Jennifer Martinez',
      role: 'Sales Representative',
      timestamp: '03/10/2024 at 2:45 PM',
      content:
        'Client requested additional electrical outlets in conference rooms. Need to revise quote and timeline. Estimated additional cost: $8,500',
      avatar: 'https://i.pravatar.cc/40?img=3', // Sample Avatar
    },
    {
      id: 2,
      user: 'Michael Torres',
      role: 'Project Manager',
      timestamp: '03/11/2024 at 9:15 AM',
      content:
        'Reviewed the request. We can accommodate this with minimal timeline impact. I\'ll coordinate with the electrical contractor. Should be ready to schedule by end of week.',
      avatar: 'https://i.pravatar.cc/40?img=5', // Sample Avatar
      image: 'https://placeimg.com/50/50/tech', // Sample image
    },
  ]);

  const [newNote, setNewNote] = useState('');

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handlePostNote = () => {
    const newTimestamp = new Date().toLocaleString();
    const newNoteObj = {
      id: notes.length + 1,
      user: 'You',
      role: 'Your Role',
      timestamp: newTimestamp,
      content: newNote,
      avatar: 'https://i.pravatar.cc/40?img=7', // Sample Avatar
    };

    setNotes([...notes, newNoteObj]);
    setNewNote('');
  };

  return (
    <div className="mb-6 p-6 bg-white shadow-md rounded-md border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sales & PM Collaboration</h2>

      {/* Shared Notes */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Shared Notes</h3>
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-blue-50 rounded-lg shadow-sm flex space-x-4"
            >
              <img
                src={note.avatar}
                alt={note.user}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-700">{note.user}</p>
                  <p className="text-xs text-gray-500">{note.timestamp}</p>
                </div>
                <p className="text-sm text-gray-700 mt-2">{note.content}</p>
                {note.image && (
                  <img
                    src={note.image}
                    alt="Note image"
                    className="w-16 h-16 object-cover mt-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Note */}
      <div className="mt-4 border-t pt-4">
        <textarea
          value={newNote}
          onChange={handleNoteChange}
          rows="3"
          placeholder="Add a note for the team..."
          className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          onClick={handlePostNote}
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post Note
        </button>
      </div>
    </div>
  );
};

export default SharedNotes;
