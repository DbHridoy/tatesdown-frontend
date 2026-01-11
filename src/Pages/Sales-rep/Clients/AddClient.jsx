import { useState } from "react";
import {
  useCreateClientMutation,
  useAddNoteMutation,
} from "../../../redux/api/clientApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ClientNote from "../../../Components/Sales-rep/Clients/ClientNote";

const AddClient = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [createClient, { isLoading }] = useCreateClientMutation();
  const [addNote] = useAddNoteMutation();

  const [draftNotes, setDraftNotes] = useState([]);

  const [formData, setFormData] = useState({
    clientName: "",
    partnerName: "",
    phoneNumber: "",
    email: "",
    address: "",
    leadSource: "",
    rating: 0,
  });

  const leadSources = ["Door", "Inbound", "Social"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ================= NOTES ================= */

  const handleAddDraftNote = ({ note, file }) => {
    if (!note && !file) {
      toast.error("Note or attachment required");
      return;
    }

    setDraftNotes((prev) => [...prev, { note, file }]);
    toast.success("Note added to draft");
  };

  /* ================= SUBMIT ================= */

  const handleCreateClient = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create client
      const client = await createClient(formData).unwrap();
      const clientId = client.data._id;

      console.log("Client from add client", client);

      // 2️⃣ Upload draft notes
      for (const n of draftNotes) {
        const fd = new FormData();
        if (n.note) fd.append("note", n.note);
        if (n.file) fd.append("file", n.file);

        await addNote({
          clientId,
          formData: fd,
        }).unwrap();
      }

      toast.success("Client & notes added successfully");
      navigate("/sales-rep/clients");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create client");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="py-8 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Client</h1>

      <form
        onSubmit={handleCreateClient}
        className="space-y-6 bg-white p-6 border rounded-lg"
      >
        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Client Name *</label>
            <input
              value={formData.clientName}
              onChange={(e) =>
                handleInputChange("clientName", e.target.value)
              }
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Partner Name</label>
            <input
              value={formData.partnerName}
              onChange={(e) =>
                handleInputChange("partnerName", e.target.value)
              }
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Phone *</label>
            <input
              value={formData.phoneNumber}
              onChange={(e) =>
                handleInputChange("phoneNumber", e.target.value)
              }
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address *</label>
          <input
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        {/* Lead Source */}
        <div>
          <label className="block text-sm font-medium">Lead Source *</label>
          <select
            value={formData.leadSource}
            onChange={(e) =>
              handleInputChange("leadSource", e.target.value)
            }
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="">Select</option>
            {leadSources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Lead Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Lead Rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleInputChange("rating", star)}
                className="text-2xl"
              >
                {star <= formData.rating ? "★" : "☆"}
              </button>
            ))}
            <span className="text-sm text-gray-600">
              {formData.rating}/5
            </span>
          </div>
        </div>

        {/* Notes */}
        <ClientNote onSubmit={handleAddDraftNote} />

        {draftNotes.length > 0 && (
          <div className="border rounded-lg p-3 text-sm space-y-1">
            <b>Draft Notes:</b>
            {draftNotes.map((n, i) => (
              <div key={i}>
                • {n.note || n.file?.name}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/s/sales-rep/clients")}
            className="flex-1 border py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            {isLoading ? "Saving..." : "Save Client"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
