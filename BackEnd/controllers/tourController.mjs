import * as TourModel from '../models/TourModel.mjs';

// Gauti visas ekskursijas
export const getAllTours = async (req, res) => {
  try {
    const tours = await TourModel.getAllTours(); // Paimame visas ekskursijas
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko gauti ekskursijų sąrašo' });
  }
};

// Gauti ekskursiją pagal ID
export const getTourById = async (req, res) => {
  try {
    const tour = await TourModel.getTourById(req.params.id); // Ieškome pagal ID
    if (!tour) {
      return res.status(404).json({ error: 'Ekskursija nerasta' });
    }
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json({ error: 'Klaida ieškant ekskursijos' });
  }
};

// Sukurti naują ekskursiją
export const createTour = async (req, res) => {
  try {
    const newTour = await TourModel.createTour(req.body); // Sukuriame iš gautų duomenų
    res.status(201).json(newTour);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko sukurti ekskursijos' });
  }
};

// Atnaujinti ekskursiją
export const updateTour = async (req, res) => {
  try {
    const updatedTour = await TourModel.updateTour(req.params.id, req.body); // Atnaujiname pagal ID
    res.status(200).json(updatedTour);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko atnaujinti ekskursijos' });
  }
};

// Ištrinti ekskursiją
export const deleteTour = async (req, res) => {
  try {
    await TourModel.deleteTour(req.params.id); // Ištriname pagal ID
    res.status(204).end(); // 204 – atsakymo turinio nėra
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko ištrinti ekskursijos' });
  }
};
