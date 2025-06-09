import { query } from "../DB_Conection.mjs";

const photoTable = `
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,                      -- nuotraukos URL adresas
  alt_text VARCHAR(255),                 -- aprašomasis tekstas (alternatyvus tekstas)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const createPhotoTable = async () => {
  try {
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'photos'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      await query(photoTable);
      console.log("✅ Nuotraukų lentelė sukurta sėkmingai.");
    } else {
      console.log("ℹ️ Nuotraukų lentelė jau egzistuoja.");
    }
  } catch (error) {
    console.error("❌ Klaida kuriant nuotraukų lentelę:", error);
    throw error;
  }
};
