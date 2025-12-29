import React from "react";

const DC = ({ job }) => {
  console.log("from dc", job);

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
        <h2 className="text-2xl font-semibold text-gray-800">
          DC (Design Consultaion)
        </h2>
        {/* <button className="text-blue-500 hover:underline">
          + Add Document
        </button> */}
      </div>

      <table className="w-full table-auto">
        <thead className="text-sm text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">Document Name</th>
            {/* <th className="px-4 py-2 text-left">Type</th> */}
            {/* <th className="px-4 py-2 text-left">Uploaded By</th> */}
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {job?.designConsultaion &&
            job.designConsultaion.map((doc, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 flex items-center">
                  <span className="mr-2 text-red-500">📄</span>
                  {doc.file}
                </td>
                {/* <td className="px-4 py-2">{doc.type}</td> */}
                <td className="px-4 py-2">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleDownload(doc.file)}
                    className="text-blue-500 hover:underline"
                  >
                    <a href={doc.file} download>
                      Download
                    </a>
                  </button>
                  {/* <button
                  onClick={() => handleDelete(doc.file)}
                  className="text-red-500 hover:underline"
                >
                  <span>🗑️</span> Delete
                </button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DC;
