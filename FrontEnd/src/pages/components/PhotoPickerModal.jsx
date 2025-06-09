import React, { useState } from "react";

const PhotoPickerModal = ({ photos, onSelect, onClose }) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  const handleConfirm = () => {
    if (selectedPhotoId) {
      onSelect(selectedPhotoId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">🖼 Pasirinkite nuotrauką</h2>

        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={() => {
              window.location.href = "/admin/photos";
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-fit"
          >
            → Eiti į /admin/photos puslapį
          </button>

          <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`border rounded p-1 cursor-pointer hover:border-blue-500 ${
                  selectedPhotoId === photo.id ? "border-blue-600" : ""
                }`}
                onClick={() => setSelectedPhotoId(photo.id)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt_text || "Nuotrauka"}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-xs mt-1 truncate">
                  {photo.alt_text || `#${photo.id}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Atšaukti
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedPhotoId}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Patvirtinti pasirinkimą
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPickerModal;
