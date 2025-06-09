import { query } from "../DB_Conection.mjs";

const tourTable = `
CREATE TABLE IF NOT EXISTS tours (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,                          -- ekskursijos pavadinimas
  description TEXT NOT NULL,                            -- aprašymas
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),     -- kaina
  duration INTERVAL NOT NULL,                           -- trukme
  date DATE NOT NULL,                                   -- data
  photo_id INTEGER REFERENCES photos(id),               -- sujungiamas su nuotraukų lentele


  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const createTourTable = async () => {
  try {
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'tours'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      await query(tourTable);
      console.log("✅ Ekskursijų lentelė sukurta sėkmingai.");
    } else {
      console.log("ℹ️ Ekskursijų lentelė jau egzistuoja.");
    }
  } catch (error) {
    console.error("❌ Klaida kuriant ekskursijų lentelę:", error);
    throw error;
  }
};
