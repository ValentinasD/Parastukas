import express from 'express';
import * as photoController from '../controllers/photoController.mjs';

const router = express.Router();

// Gauti visas nuotraukas
router.get('/', photoController.getAllPhotos);

// Gauti vieną nuotrauką pagal ID
router.get('/:id', photoController.getPhotoById);

// Sukurti naują nuotrauką
router.post('/', photoController.createPhoto);

// Atnaujinti nuotrauką
router.put('/:id', photoController.updatePhoto);

// Ištrinti nuotrauką
router.delete('/:id', photoController.deletePhoto);

export default router;

