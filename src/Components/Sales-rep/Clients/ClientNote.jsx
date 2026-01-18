import React from "react";

function ClientNote({ note, file, onNoteChange, onFileChange }) {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Notes & Attachments
      </h3>

      <div>
        <label className="block text-sm font-medium mb-1">Note</label>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Write a note..."
          className="w-full h-24 px-3 py-2 border rounded-lg resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Attachment</label>
        <input
          type="file"
          onChange={(e) => onFileChange(e.target.files[0])}
          className="w-full text-sm"
        />
      </div>

      {file && (
        <p className="text-sm text-gray-600">
          Selected file: <b>{file.name}</b>
        </p>
      )}
    </div>
  );
}

export default ClientNote;
