import React from 'react';

const DocumentControl = () => {
  const documents = [
    {
      name: 'Building_Plans_Final.pdf',
      type: 'Blueprint',
      uploadedBy: 'Michael Torres',
      date: '02/28/2025',
    },
    {
      name: 'Contract_Amendment_v2.docx',
      type: 'Blueprint',
      uploadedBy: 'Jennifer Martinez',
      date: '02/28/2025',
    },
    {
      name: 'Material_Cost_Breakdown.xlsx',
      type: 'Blueprint',
      uploadedBy: 'Michael Torres',
      date: '02/28/2025',
    },
  ];

  const handleDownload = (fileName) => {
    console.log(`Downloading ${fileName}`);
    // Implement download logic here
  };

  const handleDelete = (fileName) => {
    console.log(`Deleting ${fileName}`);
    // Implement delete logic here
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md border mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">DC (Document Control)</h2>
        <button className="text-blue-500 hover:underline">+ Add Document</button>
      </div>

      <table className="w-full table-auto">
        <thead className="text-sm text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">Document Name</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Uploaded By</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 flex items-center">
                <span className="mr-2 text-red-500">📄</span>
                {doc.name}
              </td>
              <td className="px-4 py-2">{doc.type}</td>
              <td className="px-4 py-2">{doc.uploadedBy}</td>
              <td className="px-4 py-2">{doc.date}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleDownload(doc.name)}
                  className="text-blue-500 hover:underline"
                >
                  <span>⬇️</span> Download
                </button>
                <button
                  onClick={() => handleDelete(doc.name)}
                  className="text-red-500 hover:underline"
                >
                  <span>🗑️</span> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentControl;
