import { query } from "../DB_Conection.mjs";

// 📋 Gauti visas grupines ekskursijas
export const getAllGroups = async () => {
  const result = await query(`SELECT * FROM groups ORDER BY created_at DESC`);
  return result.rows;
};

// ➕ Sukurti naują grupinį turą
export const createGroup = async ({ name, description, price, duration, photo_id }) => {
  const result = await query(
    `INSERT INTO groups (name, description, price, duration, photo_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, price, duration, photo_id]
  );
  return result.rows[0];
};

// ✏️ Atnaujinti grupinį turą
export const updateGroup = async (id, { name, description, price, duration, photo_id }) => {
  const result = await query(
    `UPDATE groups
     SET name = $1, description = $2, price = $3, duration = $4, photo_id = $5
     WHERE id = $6
     RETURNING *`,
    [name, description, price, duration, photo_id, id]
  );
  return result.rows[0];
};

// ❌ Ištrinti grupinį turą
export const deleteGroup = async (id) => {
  await query(`DELETE FROM groups WHERE id = $1`, [id]);
};
