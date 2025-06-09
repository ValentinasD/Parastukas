import express from 'express';
import * as tourController from '../controllers/tourController.mjs';

const router = express.Router();

// Gauti visas ekskursijas
router.get('/', tourController.getAllTours);

// Gauti ekskursiją pagal ID
router.get('/:id', tourController.getTourById);

// Sukurti naują ekskursiją
router.post('/', tourController.createTour);

// Atnaujinti ekskursiją
router.put('/:id', tourController.updateTour);

// Ištrinti ekskursiją
router.delete('/:id', tourController.deleteTour);

export default router;
