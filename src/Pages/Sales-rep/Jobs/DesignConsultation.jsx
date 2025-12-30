import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateDesignConsultationMutation } from "../../../redux/api/jobApi";

const DesignConsultationCreate = () => {
  const [createDesignConsultation] =
    useCreateDesignConsultationMutation();

  const navigate = useNavigate();
  const { jobId } = useParams();

  const [productDetails, setProductDetails] = useState({
    product: "",
    colorCode: "",
    estimatedGallons: "",
  });

  const [upsellDetails, setUpsellDetails] = useState({
    upsellDescription: "",
    upsellItem: "",
    addedHours: "",
  });

  const [scheduling, setScheduling] = useState({
    estimatedStartDate: "",
  });

  const [contractFile, setContractFile] = useState(null);

  const handleFileChange = (e) => {
    setContractFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("jobId", jobId);

      // product
      formData.append("product", productDetails.product);
      formData.append("colorCode", productDetails.colorCode);
      formData.append("estimatedGallons", productDetails.estimatedGallons);

      // upsell
      formData.append("upsellDescription", upsellDetails.upsellDescription);
      formData.append("upsellItem", upsellDetails.upsellItem);
      formData.append("addedHours", upsellDetails.addedHours);

      // scheduling
      formData.append("estimatedStartDate", scheduling.estimatedStartDate);

      // file
      if (contractFile) {
        formData.append("file", contractFile);
      }

      await createDesignConsultation(formData).unwrap();

      navigate(`/s/sales-rep/jobs/${jobId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create design consultation");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Create Design Consultation
      </h2>

      {/* Product Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Product Details</h3>

        <label className="block text-sm font-medium text-gray-700">
          Product
        </label>
        <input
          type="text"
          value={productDetails.product}
          onChange={(e) =>
            setProductDetails({ ...productDetails, product: e.target.value })
          }
          className="mt-1 p-3 w-full border rounded-md"
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Color Code
          </label>
          <input
            type="text"
            value={productDetails.colorCode}
            onChange={(e) =>
              setProductDetails({ ...productDetails, colorCode: e.target.value })
            }
            className="mt-1 p-3 w-full border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Estimated Gallons
          </label>
          <input
            type="number"
            value={productDetails.estimatedGallons}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                estimatedGallons: e.target.value,
              })
            }
            className="mt-1 p-3 w-full border rounded-md"
          />
        </div>
      </div>

      {/* Upsell */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Upsell</h3>

        <input
          type="text"
          placeholder="Upsell Description"
          value={upsellDetails.upsellDescription}
          onChange={(e) =>
            setUpsellDetails({
              ...upsellDetails,
              upsellDescription: e.target.value,
            })
          }
          className="mb-3 p-3 w-full border rounded-md"
        />

        <input
          type="text"
          placeholder="Upsell Item"
          value={upsellDetails.upsellItem}
          onChange={(e) =>
            setUpsellDetails({
              ...upsellDetails,
              upsellItem: e.target.value,
            })
          }
          className="mb-3 p-3 w-full border rounded-md"
        />

        <input
          type="number"
          placeholder="Added Hours"
          value={upsellDetails.addedHours}
          onChange={(e) =>
            setUpsellDetails({
              ...upsellDetails,
              addedHours: e.target.value,
            })
          }
          className="p-3 w-full border rounded-md"
        />
      </div>

      {/* Scheduling */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Estimated Start Date
        </label>
        <input
          type="date"
          value={scheduling.estimatedStartDate}
          onChange={(e) =>
            setScheduling({
              ...scheduling,
              estimatedStartDate: e.target.value,
            })
          }
          className="mt-1 p-3 w-full border rounded-md"
        />
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <input
          type="file"
          accept=".pdf,.docx,.xlsx"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-400 px-6 py-2 rounded text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 px-6 py-2 rounded text-white"
        >
          Create Job
        </button>
      </div>
    </div>
  );
};

export default DesignConsultationCreate;
