import React, { useEffect, useState } from "react";
import {
  getAllPhotos,
  createPhoto,
  deletePhoto,
} from "../../services/photoService";
import PhotoCreateModal from "../components/PhotoCreateModal";

const PhotosPage = () => {
  // Būsena nuotraukoms
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true); // Ar duomenys kraunami
  const [error, setError] = useState(null);     // Klaidos pranešimas
  const [showAddModal, setShowAddModal] = useState(false); // Modalas nuotraukai pridėti
  const [selectedPhotoIds, setSelectedPhotoIds] = useState([]); // Pažymėtų nuotraukų ID

  // Užkrauname visas nuotraukas kai komponentas užsikrauna
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getAllPhotos();
        setPhotos(data);
      } catch (err) {
        setError("Nepavyko gauti nuotraukų");
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Funkcija nuotraukos ištrynimui
  const handleDeletePhoto = async (id) => {
    try {
      await deletePhoto(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      setSelectedPhotoIds((prev) => prev.filter((pid) => pid !== id));
    } catch (err) {
      console.error("Klaida trinant nuotrauką:", err);
    }
  };

  // Pažymėjimo/peržymėjimo logika
  const togglePhotoSelection = (id) => {
    setSelectedPhotoIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded shadow p-6">
        {/* Viršus: pavadinimas ir mygtukas */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span role="img">📷</span> Nuotraukų sąrašas
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Pridėti nuotrauką
          </button>
        </div>

        {/* Klaidos pranešimas */}
        {error && <div className="text-red-500 mb-4 font-medium">{error}</div>}

        {/* Nuotraukų kortelės */}
        {!loading && photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative rounded overflow-hidden shadow hover:shadow-md transition-all duration-200"
              >
                {/* Checkbox pažymėjimui */}
                <input
                  type="checkbox"
                  checked={selectedPhotoIds.includes(photo.id)}
                  onChange={() => togglePhotoSelection(photo.id)}
                  className="absolute top-2 left-2 w-4 h-4 z-10"
                />

                {/* Nuotrauka */}
                <img
                  src={photo.url}
                  alt={photo.alt_text || "Nuotrauka"}
                  className="w-full h-48 object-cover"
                />

                {/* Pavadinimas/alt_text */}
                <div className="p-2 text-sm text-center">
                  {photo.alt_text || "Be pavadinimo"}
                </div>

                {/* Šalinimo mygtukas */}
                <div className="flex justify-center pb-2">
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-sm rounded"
                  >
                    🗑️ Ištrinti
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modalas nuotraukos pridėjimui */}
        {showAddModal && (
          <PhotoCreateModal
            onClose={() => setShowAddModal(false)}
            onCreate={async (newPhoto) => {
              try {
                const created = await createPhoto(newPhoto);
                setPhotos((prev) => [...prev, created]);
              } catch (err) {
                console.error("Klaida kuriant nuotrauką:", err);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PhotosPage;
