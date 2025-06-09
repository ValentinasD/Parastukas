import { query } from "../DB_Conection.mjs";

const userTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50)  NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Funkcija, kuri sukuria vartotojų lentelę
export const createUserTable = async () => {
  try {
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'users'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      await query(userTable);
      console.log("✅ Vartotojų lentelė sukurta sėkmingai.");
    } else {
      console.log("ℹ️ Vartotojų lentelė jau egzistuoja.");
    }
  } catch (error) {
    console.error("❌ Klaida kuriant vartotojų lentelę:", error);
    throw error;
  }
};


