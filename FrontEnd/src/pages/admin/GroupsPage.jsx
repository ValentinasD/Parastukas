import React, { useEffect, useState } from "react";
import tourService from "../../services/tourService";
import { getAllPhotos } from "../../services/photoService";
import TourModal from "../components/TourModal"; // ⬅️ universalus modalas

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Duomenų užkrovimas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tourData, photoData] = await Promise.all([
          tourService.getAllTours(),
          getAllPhotos(),
        ]);
        setTours(tourData);
        setPhotos(photoData);
      } catch (err) {
        setError("Nepavyko gauti ekskursijų arba nuotraukų");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Naujos ekskursijos kūrimas
  const handleCreateTour = async (tourData) => {
    try {
      const newTour = await tourService.createTour(tourData);
      setTours((prev) => [...prev, newTour]);
      setShowModal(false);
    } catch (err) {
      console.error("Klaida kuriant ekskursiją:", err);
    }
  };

  // Ekskursijos atnaujinimas
  const handleUpdateTour = async (tourData) => {
    try {
      const updated = await tourService.updateTour(editingTour.id, tourData);
      setTours((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
      setShowModal(false);
      setEditingTour(null);
    } catch (err) {
      console.error("Klaida atnaujinant ekskursiją:", err);
    }
  };

  // Redagavimo pradžia
  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setShowModal(true);
  };

  // Šalinimas
  const handleDeleteTour = async (id) => {
    if (!window.confirm("Ar tikrai norite ištrinti šią ekskursiją?")) return;
    try {
      await tourService.deleteTour(id);
      setTours((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Klaida šalinant ekskursiją:", err);
    }
  };

  // Paginacijos logika
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTours = tours.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span role="img">🧭</span> Ekskursijų sąrašas
          </h2>
          <button
            onClick={() => {
              setEditingTour(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Pridėti ekskursiją
          </button>
        </div>

        {error && <div className="text-red-500 mb-4 font-medium">{error}</div>}

        {!loading && tours.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Pavadinimas</th>
                    <th className="p-2 border">Aprašymas</th>
                    <th className="p-2 border">Kaina (€)</th>
                    <th className="p-2 border">Trukmė</th>
                    <th className="p-2 border">Data</th>
                    <th className="p-2 border">Nuotrauka</th>
                    <th className="p-2 border">Veiksmai</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedTours.map((tour) => (
                    <tr key={tour.id}>
                      <td className="p-2 border">{tour.id}</td>
                      <td className="p-2 border">{tour.title}</td>
                      <td className="p-2 border">{tour.description}</td>
                      <td className="p-2 border">{tour.price}</td>
                      <td className="p-2 border">
                        {typeof tour.duration === "object"
                          ? JSON.stringify(tour.duration)
                          : tour.duration}
                      </td>
                      <td className="p-2 border">
                        {new Date(tour.date).toLocaleDateString()}
                      </td>
                      <td className="p-2 border">
                        {tour.photo_url ? (
                          <img
                            src={tour.photo_url}
                            alt="Nuotrauka"
                            className="h-16 object-cover rounded"
                          />
                        ) : (
                          <span>Be nuotraukos</span>
                        )}
                      </td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleEditTour(tour)}
                          className="bg-yellow-500 text-white px-2 py-1 text-sm rounded mr-2"
                        >
                          ✏️ Redaguoti
                        </button>
                        <button
                          onClick={() => handleDeleteTour(tour.id)}
                          className="bg-red-600 text-white px-2 py-1 text-sm rounded"
                        >
                          🗑️ Ištrinti
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginacija: atgal / pirmyn */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                ⬅️ Atgal
              </button>
              <span>
                Puslapis {currentPage} iš {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    startIndex + itemsPerPage < tours.length ? prev + 1 : prev
                  )
                }
                disabled={startIndex + itemsPerPage >= tours.length}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Pirmyn ➡️
              </button>
            </div>

            {/* Puslapių numeriai */}
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {showModal && (
          <TourModal
            onClose={() => {
              setShowModal(false);
              setEditingTour(null);
            }}
            onSubmit={editingTour ? handleUpdateTour : handleCreateTour}
            photos={photos}
            initialData={editingTour}
          />
        )}
      </div>
    </div>
  );
};

export default ToursPage;
