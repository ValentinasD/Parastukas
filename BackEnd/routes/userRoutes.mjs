import express from 'express';
import * as userController from '../controllers/userController.mjs';

const router = express.Router();

// Gauti visus vartotojus
router.get('/', userController.getAllUsers);

// Gauti vieną vartotoją pagal el. paštą (jei reikėtų)
router.get('/email/:email', async (req, res) => {
  try {
    const user = await userController.getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ error: 'Vartotojas nerastas' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Klaida ieškant vartotojo' });
  }
});

// Sukurti naują vartotoją
router.post('/', userController.createUser);

// Atnaujinti vartotoją
router.put('/:id', userController.updateUser);

// Ištrinti vartotoją
router.delete('/:id', userController.deleteUser);

export default router;
