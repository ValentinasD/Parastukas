import * as GroupModel from '../models/GroupModel.mjs';

// 📋 Gauti visas grupines ekskursijas
export const getAllGroups = async (req, res) => {
  try {
    const groups = await GroupModel.getAllGroups(); // Paimame visas grupes
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko gauti grupių sąrašo' });
  }
};

// 🔍 Gauti grupę pagal ID
export const getGroupById = async (req, res) => {
  try {
    const group = await GroupModel.getGroupById(req.params.id); // Ieškome pagal ID
    if (!group) {
      return res.status(404).json({ error: 'Grupė nerasta' });
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: 'Klaida ieškant grupės' });
  }
};

// ➕ Sukurti naują grupę
export const createGroup = async (req, res) => {
  try {
    const { name, description, price, duration, photo_id } = req.body;
    const newGroup = await GroupModel.createGroup({ name, description, price, duration, photo_id });
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko sukurti grupės' });
  }
};

// ✏️ Atnaujinti grupės duomenis
export const updateGroup = async (req, res) => {
  try {
    const { name, description, price, duration, photo_id } = req.body;
    const updatedGroup = await GroupModel.updateGroup(req.params.id, { name, description, price, duration, photo_id });
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko atnaujinti grupės' });
  }
};

// ❌ Ištrinti grupę
export const deleteGroup = async (req, res) => {
  try {
    await GroupModel.deleteGroup(req.params.id); // Ištriname pagal ID
    res.status(204).end(); // Tuščias atsakymas
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko ištrinti grupės' });
  }
};
