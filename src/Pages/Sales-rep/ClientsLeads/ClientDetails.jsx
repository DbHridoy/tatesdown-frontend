import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCallLog from "./AddCallLog";
import StarRating from "../../../Components/Sales-rep/Common/StarRating";
import {
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useAddCallLogMutation,
  useAddNoteMutation,
} from "../../../redux/api/clientApi";

const ClientDetails = () => {
  const { clientId } = useParams();

  const [updateClientMutation] = useUpdateClientMutation();
  const [addCallLogMutation] = useAddCallLogMutation();
  const [addNoteMutation] = useAddNoteMutation();

  const [draftClient, setDraftClient] = useState({
    clientName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [pendingCallLogs, setPendingCallLogs] = useState([]);
  const [pendingNotes, setPendingNotes] = useState([]);
  const [draftNoteText, setDraftNoteText] = useState("");
  const [draftNoteFiles, setDraftNoteFiles] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: clientData,
    isLoading,
    isError,
  } = useGetClientByIdQuery(clientId);
  const client = clientData?.data;

  useEffect(() => {
    if (client) {
      setDraftClient({
        clientName: client.clientName || "",
        email: client.email || "",
        phoneNumber: client.phoneNumber || "",
        address: client.address || "",
      });
      setPendingCallLogs([]);
      setPendingNotes([]);
      setDraftNoteText("");
      setDraftNoteFiles(null);
    }
  }, [client]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading client data</div>;

  const handleClientChange = (field, value) => {
    setDraftClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCallLog = (callLogData) => {
    setPendingCallLogs([...pendingCallLogs, callLogData]);
  };

  const handleAddNote = () => {
    if (draftNoteText.trim()) {
      setPendingNotes([
        ...pendingNotes,
        {
          clientId,
          text: draftNoteText,
          file: draftNoteFiles ? draftNoteFiles[0] : null,
        },
      ]);
      setDraftNoteText("");
      setDraftNoteFiles(null);
    }
  };
  const navigate=useNavigate()

  const handleSaveChanges = async () => {
    try {
      // 1️⃣ Update client info
      await updateClientMutation({ id: clientId, ...draftClient }).unwrap();

      // 2️⃣ Add pending call logs
      for (const log of pendingCallLogs) {
        await addCallLogMutation(log).unwrap();
      }

      // 3️⃣ Add pending notes as FormData
      for (const note of pendingNotes) {
        const formData = new FormData();
        formData.append("clientId", note.clientId);
        formData.append("text", note.text);
        if (note.file) {
          formData.append("file", note.file);
        }
        await addNoteMutation(formData).unwrap();
      }

      setPendingCallLogs([]);
      setPendingNotes([]);

      alert("All changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes!");
    }
  };

  const handleCancel = () => {
    setPendingCallLogs([]);
    setPendingNotes([]);
    setDraftClient(client);
    setDraftNoteText("");
    setDraftNoteFiles(null);
    
    navigate(-1);
  };

  const hasPendingChanges =
    pendingCallLogs.length > 0 ||
    pendingNotes.length > 0 ||
    draftClient.clientName !== client.clientName ||
    draftClient.email !== client.email ||
    draftClient.phoneNumber !== client.phoneNumber ||
    draftClient.address !== client.address;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Client Details</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
          <h2 className="text-lg font-semibold text-gray-700">
            Client ID: {client?.customClientId}
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Client office (Jan 2025)
          </span>
        </div>
      </div>

      {/* Client Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Client Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={draftClient.clientName}
            onChange={(e) => handleClientChange("clientName", e.target.value)}
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="email"
            value={draftClient.email}
            onChange={(e) => handleClientChange("email", e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="tel"
            value={draftClient.phoneNumber}
            onChange={(e) => handleClientChange("phoneNumber", e.target.value)}
            placeholder="Phone"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={draftClient.address}
            onChange={(e) => handleClientChange("address", e.target.value)}
            placeholder="Address"
            className="w-full px-3 py-2 border rounded-lg md:col-span-2"
          />
        </div>
      </div>

      {/* Load Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Load Information
        </h3>
        <p>Load Source: {client.leadSource || "Door"}</p>
        <p>Call Status: {client.callStatus || "Not Called"}</p>
      </div>

      {/* Lead Rating */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <span className="block text-gray-600 mb-2 font-medium">
          Lead Rating
        </span>
        <StarRating value={client?.rating || 0} />
      </div>

      {/* Call History */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Call History</h3>
        {(client.callLogs || []).concat(pendingCallLogs).length > 0 ? (
          [...(client.callLogs || []), ...pendingCallLogs].map((log, i) => (
            <div key={i} className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">{log.status || "Call"}</span>
                <span className="text-sm text-gray-500">
                  {log.callAt
                    ? new Date(log.callAt).toLocaleDateString()
                    : "Pending"}
                </span>
              </div>
              <p className="text-sm text-gray-600">{log.note || "No note"}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No call logs yet</p>
        )}

        <button
          onClick={openModal}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
        >
          Add Call Log
        </button>
      </div>

      {/* Notes & Attachments */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Notes & Attachments
        </h3>

        {/* Note Text */}
        <textarea
          value={draftNoteText}
          onChange={(e) => setDraftNoteText(e.target.value)}
          placeholder="Add note..."
          className="w-full h-24 px-3 py-2 border rounded-lg resize-none"
        />

        {/* File Input */}
        <input
          type="file"
          onChange={(e) => setDraftNoteFiles(e.target.files)}
          className="w-full mt-2"
        />

        {/* Add Note Button */}
        <button
          onClick={handleAddNote}
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mt-2"
        >
          Add Note
        </button>

        {/* Existing Notes */}
        {client.notes && client.notes.length > 0 && (
          <div className="mt-2">
            <h4 className="font-medium text-gray-700">Existing Notes:</h4>
            {client.notes.map((note, i) => (
              <div key={i} className="text-sm text-gray-600 mt-1">
                <p>{note.text}</p>
                {note.file && (
                  <a
                    key={i}
                    href={note.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm block"
                  >
                    {note.file}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pending Notes */}
        {pendingNotes.length > 0 && (
          <div className="mt-2">
            <h4 className="font-medium text-gray-700">Pending Notes:</h4>
            {pendingNotes.map((note, i) => (
              <div key={i} className="text-sm text-gray-600 mt-1">
                <p>{note.text}</p>
                {note.file && (
                  <span className="text-gray-500 text-sm block">
                    {note.file.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No notes placeholder */}
        {(!client.notes || client.notes.length === 0) &&
          pendingNotes.length === 0 && (
            <div className="text-sm text-gray-400 italic">
              No notes added yet
            </div>
          )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        {hasPendingChanges && (
          <>
            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button onClick={handleCancel} className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors">
              Cancel
            </button>
          </>
        )}
        {/* <button
          className={`flex-1 bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors ${
            !hasPendingChanges ? "ml-auto" : ""
          }`}
        >
          Cancel
        </button> */}
      </div>

      {/* Add Call Log Modal */}
      {showModal && (
        <AddCallLog
          closeModal={closeModal}
          clientId={clientId}
          onSubmit={handleAddCallLog}
        />
      )}
    </div>
  );
};

export default ClientDetails;
