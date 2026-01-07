import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCallLog from "./AddCallLog";
import StarRating from "../../../Components/Sales-rep/Common/StarRating";
import {
  useUpdateClientMutation,
  useAddCallLogMutation,
  useAddNoteMutation,
  useGetClientByIdQuery,
} from "../../../redux/api/clientApi";
import toast from "react-hot-toast";

const EMPTY_CLIENT = {
  clientName: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const ClientDetails = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [updateClient] = useUpdateClientMutation();
  const [addCallLog] = useAddCallLogMutation();
  const [addNote] = useAddNoteMutation();

  const [draftClient, setDraftClient] = useState(EMPTY_CLIENT);
  const [pendingCallLogs, setPendingCallLogs] = useState([]);
  const [pendingNotes, setPendingNotes] = useState([]);
  const [draftNoteText, setDraftNoteText] = useState("");
  const [draftNoteFiles, setDraftNoteFiles] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: clientData,
    isLoading,
    isError,
  } = useGetClientByIdQuery(clientId, {
    skip: !clientId,
  });

  const client = clientData?.data ?? null;

  /* -------------------- Sync API → Draft -------------------- */
  useEffect(() => {
    if (!client) return;

    setDraftClient({
      clientName: client.clientName ?? "",
      email: client.email ?? "",
      phoneNumber: client.phoneNumber ?? "",
      address: client.address ?? "",
    });

    setPendingCallLogs([]);
    setPendingNotes([]);
    setDraftNoteText("");
    setDraftNoteFiles(null);
  }, [client]);

  /* -------------------- Handlers -------------------- */
  const handleClientChange = (field, value) => {
    setDraftClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCallLog = (log) => {
    setPendingCallLogs((prev) => [...prev, log]);
  };

  const handleAddNote = () => {
    if (!draftNoteText.trim()) return;

    setPendingNotes((prev) => [
      ...prev,
      {
        clientId,
        text: draftNoteText,
        file: draftNoteFiles?.[0] ?? null,
      },
    ]);

    setDraftNoteText("");
    setDraftNoteFiles(null);
  };

  const handleSaveChanges = async () => {
    try {
      await updateClient({
        id: clientId,
        ...draftClient,
      }).unwrap();

      for (const log of pendingCallLogs) {
        await addCallLog(log).unwrap();
      }

      for (const note of pendingNotes) {
        const formData = new FormData();
        formData.append("clientId", note.clientId);
        formData.append("text", note.text);
        if (note.file) formData.append("file", note.file);

        await addNote(formData).unwrap();
      }

      toast.success("All changes saved successfully!");
      // navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    }
  };

  const handleCancel = () => {
    if (client) {
      setDraftClient({
        clientName: client.clientName ?? "",
        email: client.email ?? "",
        phoneNumber: client.phoneNumber ?? "",
        address: client.address ?? "",
      });
    }

    setPendingCallLogs([]);
    setPendingNotes([]);
    setDraftNoteText("");
    setDraftNoteFiles(null);

    navigate(-1);
  };

  /* -------------------- Derived State -------------------- */
  const hasPendingChanges = useMemo(() => {
    if (!client) return false;

    return (
      pendingCallLogs.length > 0 ||
      pendingNotes.length > 0 ||
      draftClient.clientName !== (client.clientName ?? "") ||
      draftClient.email !== (client.email ?? "") ||
      draftClient.phoneNumber !== (client.phoneNumber ?? "") ||
      draftClient.address !== (client.address ?? "")
    );
  }, [pendingCallLogs, pendingNotes, draftClient, client]);

  /* -------------------- UI States -------------------- */
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !client)
    return <div className="p-6">Error loading client</div>;

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Client Details</h1>
        <h2 className="text-gray-600">
          Client ID: {client.customClientId ?? "—"}
        </h2>
      </div>

      {/* Client Info */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="font-semibold">Client Info</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={draftClient.clientName}
            onChange={(e) => handleClientChange("clientName", e.target.value)}
            placeholder="Name"
            className="border p-2 rounded"
          />
          <input
            value={draftClient.email}
            onChange={(e) => handleClientChange("email", e.target.value)}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            value={draftClient.phoneNumber}
            onChange={(e) => handleClientChange("phoneNumber", e.target.value)}
            placeholder="Phone"
            className="border p-2 rounded"
          />
          <input
            value={draftClient.address}
            onChange={(e) => handleClientChange("address", e.target.value)}
            placeholder="Address"
            className="border p-2 rounded md:col-span-2"
          />
        </div>
      </div>

      {/* Lead Info */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-2">Lead Information</h3>
        <p>Lead Source: {client.leadSource ?? "—"}</p>
        <p>Call Status: {client.callStatus ?? "—"}</p>
      </div>

      {/* Rating */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-2">Lead Rating</h3>
        <StarRating value={client.rating ?? 0} />
      </div>

      {/* Call History */}
      <div className="bg-white p-6 rounded shadow space-y-2">
        <h3 className="font-semibold">Call History</h3>

        {[...(client.callLogs ?? []), ...pendingCallLogs].length === 0 && (
          <p className="text-gray-400 italic">No call logs yet</p>
        )}

        {[...(client.callLogs ?? []), ...pendingCallLogs].map((log, i) => (
          <div key={i} className="border-b pb-2">
            <div className="flex justify-between">
              <span>{log.status ?? "Call"}</span>
              <span className="text-sm text-gray-500">
                {log.callAt
                  ? new Date(log.callAt).toLocaleDateString()
                  : "Pending"}
              </span>
            </div>
            <p className="text-sm">{log.note ?? "No note"}</p>
          </div>
        ))}

        <button
          onClick={() => setShowModal(true)}
          className="w-full border-dashed border p-3 rounded text-gray-500"
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

      {/* Actions */}
      {hasPendingChanges && (
        <div className="flex gap-4">
          <button
            onClick={handleSaveChanges}
            className="flex-1 bg-blue-600 text-white p-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      {showModal && (
        <AddCallLog
          closeModal={() => setShowModal(false)}
          clientId={clientId}
          onSubmit={handleAddCallLog}
        />
      )}
    </div>
  );
};

export default ClientDetails;
