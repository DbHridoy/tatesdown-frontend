import React from "react";
import { useNavigate } from "react-router-dom";
const isImageFile = (url = "") => /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url);

const getFileName = (url = "") => decodeURIComponent(url.split("/").pop());

const DC = ({ job }) => {
  console.log("from dc", job);
  const navigate = useNavigate()

  const handleDownload = (fileName) => {
    console.log(`Downloading ${fileName}`);
    // Implement download logic here
  };

  const handleDelete = (fileName) => {
    console.log(`Deleting ${fileName}`);
    // Implement delete logic here
  };

  const hasDocs = job?.designConsultaion && job.designConsultaion.length > 0;

  return (
    <div className="p-6 bg-white shadow-md rounded-md border mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          DC (Design Consultation)
        </h2>

        {/* {!hasDocs && ( */}
          <button
            onClick={() => navigate(`/s/sales-rep/jobs/${job._id}/design-consultation`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Document
          </button>
        {/* )} */}
      </div>

      {hasDocs ? (
        <table className="w-full table-auto">
          <thead className="text-sm text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Document Name</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {job.designConsultaion.map((doc, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 flex items-center">
                  <span className="mr-2 text-red-500">📄</span>
                  {getFileName(doc.file)}
                </td>
                <td className="px-4 py-2">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <a
                    href={doc.file}
                    download
                    className="text-blue-500 hover:underline"
                    onClick={() => handleDownload(doc.file)}
                  >
                    Download
                  </a>
                  {/* Optional Delete button */}
                  {/* <button
                    onClick={() => handleDelete(doc.file)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No documents available.</p>
      )}
    </div>
  );
};

export default DC;
