import React, { useEffect, useState } from "react";
import PhotoPickerModal from "./PhotoPickerModal";

const GroupTourModal = ({ onClose, onSubmit, photos, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    date: "",
    photo_id: null,
  });

  const [showPhotoPicker, setShowPhotoPicker] = useState(false);

  // Užpildo formą redagavimo atveju
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        duration: initialData.duration || "",
        date: initialData.date?.slice(0, 10) || "", // tik yyyy-mm-dd
        photo_id: initialData.photo_id || null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // gali būti create arba update
    onClose();
  };

  const handlePhotoSelect = (photoId) => {
    setFormData((prev) => ({ ...prev, photo_id: photoId }));
    setShowPhotoPicker(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "✏️ Redaguoti ekskursiją" : "➕ Nauja ekskursija"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Pavadinimas"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Aprašymas"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="price"
            step="0.01"
            placeholder="Kaina"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="duration"
            placeholder="Trukmė (pvz., 03:00:00)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="button"
            onClick={() => setShowPhotoPicker(true)}
            className="w-full bg-blue-100 text-blue-800 px-3 py-2 rounded hover:bg-blue-200"
          >
            {formData.photo_id
              ? `Pasirinkta nuotrauka ID: ${formData.photo_id}`
              : "Pasirinkti nuotrauką"}
          </button>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Atšaukti
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Atnaujinti" : "Sukurti"}
            </button>
          </div>
        </form>

        {showPhotoPicker && (
          <PhotoPickerModal
            photos={photos}
            onSelect={handlePhotoSelect}
            onClose={() => setShowPhotoPicker(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GroupTourModal;
