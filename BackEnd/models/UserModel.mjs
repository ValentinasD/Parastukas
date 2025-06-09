import { query } from "../DB_Conection.mjs";

// 🔍 Gauti vartotoją pagal el. paštą (naudojama prisijungimui ar tikrinimui ar egzistuoja)
export const getUserByEmail = async (email) => {
  const result = await query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

// ➕ Sukurti naują vartotoją (registracija)
export const createUser = async ({ username, email, password, role }) => {
  const result = await query(
    `INSERT INTO users (username, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [username, email, password, role]
  );
  return result.rows[0];
};

// 📋 Gauti visų vartotojų sąrašą (naudinga admin panelėje)
export const getAllUsers = async () => {
  const result = await query(`SELECT * FROM users ORDER BY created_at DESC`);
  return result.rows;
};


// ✏️ Atnaujinti visus vartotojo duomenis pagal ID (naudojama, kai žinomi visi laukai)
export const updateUser = async (id, { username, email,  role }) => {
  const result = await query(
    `UPDATE users
     SET username = $1,
         email = $2,
         role = $3
     WHERE id = $4
     RETURNING *`,
    [username, email, role, id]
  );
  return result.rows[0];
};

// ❌ Ištrinti vartotoją pagal ID
export const deleteUser = async (id) => {
  await query(`DELETE FROM users WHERE id = $1`, [id]);
};
