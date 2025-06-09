import express from 'express';
import * as groupController from '../controllers/groupTourController.mjs';

const router = express.Router();

// Gauti visas grupines ekskursijas
router.get('/', groupController.getAllGroups);

// Gauti vieną grupę pagal ID
router.get('/:id', groupController.getGroupById);

// Sukurti naują grupę
router.post('/', groupController.createGroup);

// Atnaujinti grupę
router.put('/:id', groupController.updateGroup);

// Ištrinti grupę
router.delete('/:id', groupController.deleteGroup);

export default router;
