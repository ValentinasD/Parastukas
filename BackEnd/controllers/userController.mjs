import * as UserModel from '../models/UserModel.mjs';

// Gauti visus vartotojus
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers(); // Paimame visus vartotojus iš modelio
    res.status(200).json(users); // Gražiname JSON formatu
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko gauti vartotojų' });
  }
};

// Gauti vartotoją pagal ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id); // Pagal ID ieškome vartotojo
    if (!user) {
      return res.status(404).json({ error: 'Vartotojas nerastas' }); // Jei nerasta – grąžiname 404
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Klaida ieškant vartotojo' });
  }
};

// Sukurti naują vartotoją
export const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.createUser(req.body); // Sukuriame vartotoją iš atsiųstų duomenų
    res.status(201).json(newUser); // Grąžiname naujai sukurtą vartotoją
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko sukurti vartotojo' });
  }
};

// Atnaujinti vartotojo informaciją
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.updateUser(req.params.id, req.body); // Atnaujiname pagal ID
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko atnaujinti vartotojo' });
  }
};

// Ištrinti vartotoją
export const deleteUser = async (req, res) => {
  try {
    await UserModel.deleteUser(req.params.id); // Šaliname pagal ID
    res.status(204).end(); // Grąžiname tuščią atsakymą (204 No Content)
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko ištrinti vartotojo' });
  }
};

