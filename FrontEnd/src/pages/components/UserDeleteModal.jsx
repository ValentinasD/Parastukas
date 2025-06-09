import React, { useState } from "react";


const UserDeleteModal = ({ user, onClose, onDelete }) => {
  // Būsena patvirtinimo žinutės
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleDelete = () => {
    // Iškviečiame tėvinę funkciją su vartotojo ID
    onDelete(user.id);
    // Uždaryti modalą
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">🗑️ Ištrinti vartotoją</h2>
        <p>Ar tikrai norite ištrinti vartotoją {user.username}?</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Taip, ištrinti
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Atšaukti
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserDeleteModal;
