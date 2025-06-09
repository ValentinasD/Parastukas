import { query } from "../DB_Conection.mjs";

// Gauti visas nuotraukas
export const getAllPhotos = async () => {
  const result = await query(`SELECT * FROM photos ORDER BY created_at DESC`);
  return result.rows;
};

// Įkelti naują nuotrauką
export const createPhoto = async ({ url, alt_text }) => {
  const result = await query(
    `INSERT INTO photos (url, alt_text)
     VALUES ($1, $2)
     RETURNING *`,
    [url, alt_text]
  );
  return result.rows[0];
};

// Gauti nuotrauką pagal ID
export const getPhotoById = async (id) => {
  const result = await query(`SELECT * FROM photos WHERE id = $1`, [id]);
  return result.rows[0];
};

// Atnaujinti nuotrauką
export const updatePhoto = async (id, { url, alt_text }) => {
  const result = await query(
    `UPDATE photos
     SET url = $1, alt_text = $2
     WHERE id = $3
     RETURNING *`,
    [url, alt_text, id]
  );
  return result.rows[0];
};

// Saugiai ištrinti nuotrauką
export const deletePhoto = async (id) => {
  // Patikriname ar ši nuotrauka naudojama tours lentelėje
  const result = await query(
    `SELECT COUNT(*) FROM tours WHERE photo_id = $1`,
    [id]
  );

  if (parseInt(result.rows[0].count) > 0) {
    throw new Error("Negalima ištrinti – ši nuotrauka naudojama ekskursijoje");
  }

  // Jei nenaudojama, ištriname
  const deleteResult = await query(`DELETE FROM photos WHERE id = $1`, [id]);
  if (deleteResult.rowCount === 0) {
    throw new Error("Nuotrauka nerasta");
  }
};
