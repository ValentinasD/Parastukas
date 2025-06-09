import { query } from "../DB_Conection.mjs";

const groupTable = `
CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,                         -- grupės pavadinimas
  description TEXT,                                   -- aprašymas
  price NUMERIC(10, 2) CHECK (price >= 0),            -- kaina (privalo būti teigiama)
  duration INTERVAL,                                  -- trukmė (pvz., 1 hour 30 minutes)
  photo_id INTEGER REFERENCES photos(id),             -- nuoroda į nuotrauką
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP      -- sukūrimo laikas
);
`;

export const createGroupTable = async () => {
  try {
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'groups'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      await query(groupTable);
      console.log("✅ Grupės lentelė sukurta sėkmingai.");
    } else {
      console.log("ℹ️ Grupės lentelė jau egzistuoja.");
    }
  } catch (error) {
    console.error("❌ Klaida kuriant grupės lentelę:", error);
    throw error;
  }
};
