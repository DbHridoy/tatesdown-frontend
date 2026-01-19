import { useState } from "react";
import AddMileageLog from "./AddMileageLog";

const AddExpense = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div className="">
      {/* Container for Heading and Button */}
      <div className="mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Expenses / Mileage
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Overview of sales performance and metrics
          </p>
        </div>
        {/* Add Mileage Log Button */}
        <button 
          className="w-full sm:w-auto px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2"
          onClick={openModal}
        >
          <span className="text-lg">+</span>
          <span>Add Expense</span>
        </button>
      </div>

      {/* Other content here */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <AddMileageLog closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
