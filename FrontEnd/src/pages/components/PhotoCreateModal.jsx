import React, { useState } from "react";

const PhotoCreateModal = ({ onClose, onCreate }) => {
  // Lokalūs įvesties laukų duomenys
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Patikriname ar URL užpildytas
    if (!url.trim()) {
      alert("Prašome įvesti nuotraukos URL");
      return;
    }

    // Iškviečiame sukūrimo funkciją su `url` ir `alt_text`
    onCreate({ url, alt_text: altText });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-purple-600">➕</span> Pridėti nuotrauką
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Pavadinimas (alt_text) */}
          <label className="block mb-1 text-sm font-medium">Pavadinimas (nebūtinas)</label>
          <input
            type="text"
            className="border p-2 rounded w-full mb-4"
            placeholder="Pvz. Trakų pilis"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />

          {/* Nuotraukos URL */}
          <label className="block mb-1 text-sm font-medium">Nuotraukos URL *</label>
          <input
            type="text"
            className="border p-2 rounded w-full mb-4"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          {/* Veiksmų mygtukai */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Atšaukti
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Pridėti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoCreateModal;
