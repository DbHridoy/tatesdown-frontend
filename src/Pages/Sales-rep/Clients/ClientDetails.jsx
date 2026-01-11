import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AddCallLog from "./AddCallLog";
import {
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useAddCallLogMutation,
  useAddNoteMutation,
} from "../../../redux/api/clientApi";
const isImageFile = (url) => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

const getFileNameFromUrl = (url) => {
  try {
    return decodeURIComponent(url.split("/").pop().split("?")[0]);
  } catch {
    return "Download file";
  }
};

const ClientDetails = () => {
  const { clientId } = useParams();
  console.log("ClientId from details", clientId);
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetClientByIdQuery(
    clientId,
    { skip: !clientId }
  );

  const [updateClient] = useUpdateClientMutation();
  const [addCallLog] = useAddCallLogMutation();
  const [addNote] = useAddNoteMutation();

  const client = data?.data;

  /* -------------------- Edit Mode -------------------- */
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [noteText, setNoteText] = useState("");
  const [noteFile, setNoteFile] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);

  /* -------------------- Sync API → Form -------------------- */
  useEffect(() => {
    if (!client) return;

    setForm({
      clientName: client.clientName || "",
      email: client.email || "",
      phoneNumber: client.phoneNumber || "",
      address: client.address || "",
    });
  }, [client]);

  /* -------------------- Handlers -------------------- */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClient = async () => {
    try {
      await updateClient({ id: clientId, ...form }).unwrap();
      toast.success("Client updated");
      setIsEditing(false);
      refetch();
    } catch {
      toast.error("Failed to update client");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setForm({
      clientName: client.clientName || "",
      email: client.email || "",
      phoneNumber: client.phoneNumber || "",
      address: client.address || "",
    });
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    const formData = new FormData();
    formData.append("note", noteText);
    if (noteFile) formData.append("file", noteFile);

    try {
      await addNote({
        clientId,
        formData,
      }).unwrap();

      toast.success("Note added");
      setNoteText("");
      setNoteFile(null);
      refetch();
    } catch (err) {
      toast.error("Failed to add note");
    }
  };

  /* -------------------- UI States -------------------- */
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !client)
    return <div className="p-6">Failed to load client</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{client.clientName}</h1>
          <p className="text-gray-500">
            Client ID: {client.customClientId || "—"}
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSaveClient}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Client Info */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="font-semibold">Client Information</h3>

        {[
          ["Name", "clientName"],
          ["Email", "email"],
          ["Phone", "phoneNumber"],
          ["Address", "address"],
        ].map(([label, field]) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={field}
              value={form[field]}
              disabled={!isEditing}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`w-full p-2 border rounded ${
                !isEditing ? "bg-gray-100" : ""
              }`}
            />
          </div>
        ))}
      </div>

      {/* Call History */}
      <div className="bg-white p-6 rounded shadow space-y-3">
        <h3 className="font-semibold">Call History</h3>

        {client.callLogs?.length === 0 && (
          <p className="text-gray-400 italic">No call logs</p>
        )}

        {client.callLogs?.map((log, i) => (
          <div key={i} className="border-b pb-2">
            <div className="flex justify-between">
              <span>{log.status}</span>
              <span className="text-sm text-gray-500">
                {new Date(log.callAt).toLocaleDateString()}
              </span>
            </div>

            {/* Note */}
            {log.note && <p className="text-sm">{log.note}</p>}

            {/* Reason (if exists) */}
            {log.reason && (
              <p className="text-sm text-gray-600 italic">
                <b>Reason:</b> {log.reason}
              </p>
            )}
          </div>
        ))}

        <button
          onClick={() => setShowCallModal(true)}
          className="w-full border-dashed border p-2 rounded text-gray-600"
        >
          Add Call Log
        </button>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="font-semibold">Notes & Attachments</h3>

        {/* Add Note */}
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add note..."
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setNoteFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleAddNote}
          className="w-full bg-gray-100 p-2 rounded"
        >
          Add Note
        </button>

        {/* Existing Notes */}
        {client.notes?.length > 0 ? (
          <div className="space-y-3">
            {client.notes.map((note, i) => (
              <div
                key={i}
                className="border rounded-lg p-3 bg-gray-50 space-y-2"
              >
                {/* Note text */}
                <p className="text-sm text-gray-800">{note.note || "—"}</p>

                {/* Attachment */}
                {note.file && (
                  <div>
                    {isImageFile(note.file) ? (
                      <img
                        src={note.file}
                        alt="Attachment"
                        className="max-w-xs rounded border"
                      />
                    ) : (
                      <a
                        href={note.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        📎 {getFileNameFromUrl(note.file)}
                      </a>
                    )}
                  </div>
                )}

                {/* Timestamp (optional) */}
                {note.createdAt && (
                  <div className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No notes added yet</p>
        )}
      </div>

      {showCallModal && (
        <AddCallLog
          clientId={clientId}
          closeModal={() => {
            setShowCallModal(false);
            refetch();
          }}
          onSubmit={async (payload) => {
            console.log("Payload from details", payload);
            await addCallLog(payload).unwrap();
            toast.success("Call log added");
            setShowCallModal(false);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default ClientDetails;
