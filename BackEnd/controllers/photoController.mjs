import * as PhotoModel from '../models/PhotoModel.mjs';

// Gauti visas nuotraukas
export const getAllPhotos = async (req, res) => {
  try {
    const photos = await PhotoModel.getAllPhotos();
    res.status(200).json(photos);
  } catch (err) {
    console.error("❌ Klaida gaunant visas nuotraukas:", err.message);
    res.status(500).json({ error: 'Nepavyko gauti nuotraukų' });
  }
};

// Gauti vieną nuotrauką pagal ID
export const getPhotoById = async (req, res) => {
  try {
    const photo = await PhotoModel.getPhotoById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Nuotrauka nerasta' });
    }
    res.status(200).json(photo);
  } catch (err) {
    console.error("❌ Klaida gaunant nuotrauką pagal ID:", err.message);
    res.status(500).json({ error: 'Klaida ieškant nuotraukos' });
  }
};

// Sukurti naują nuotrauką
export const createPhoto = async (req, res) => {
  try {
    const newPhoto = await PhotoModel.createPhoto(req.body);
    res.status(201).json(newPhoto);
  } catch (err) {
    console.error("❌ Klaida kuriant nuotrauką:", err.message);
    res.status(500).json({ error: 'Nepavyko sukurti nuotraukos' });
  }
};

// Atnaujinti nuotrauką
export const updatePhoto = async (req, res) => {
  try {
    const updated = await PhotoModel.updatePhoto(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Nuotrauka nerasta' });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Klaida atnaujinant nuotrauką:", err.message);
    res.status(500).json({ error: 'Nepavyko atnaujinti nuotraukos' });
  }
};

// Ištrinti nuotrauką
export const deletePhoto = async (req, res) => {
  try {
    await PhotoModel.deletePhoto(req.params.id);
    res.status(204).end(); // Sėkmingai ištrinta – tuščias atsakymas
  } catch (err) {
    console.error("❌ Klaida trinant nuotrauką:", err.message);
    res.status(400).json({ error: err.message }); // 400 jei klaida dėl FK
  }
};
