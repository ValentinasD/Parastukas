// Įkeliame aplinkos kintamuosius iš .env failo
import dotenv from 'dotenv';
// Įkeliame PostgreSQL biblioteką
import pkg from 'pg';

dotenv.config(); // Suaktyviname dotenv

const { Pool } = pkg;

// Sukuriame naują prisijungimo prie duomenų bazės 
const pool = new Pool({
  user: process.env.DB_USER,         // Vartotojo vardas
  host: process.env.DB_HOST,         // Serverio adresas (pvz., localhost)
  database: process.env.DB_NAME,     // Duomenų bazės pavadinimas
  password: process.env.DB_PASSWORD, // Slaptažodis
  port: Number(process.env.DB_PORT), // Prievadas (pvz., 5432)
});

// Reaguojame į netikėtas klaidas jungiantis prie DB
pool.on('error', (err) => {
  console.error('❌ Klaida jungiantis prie DB:', err.stack);
});

// Funkcija prisijungimui prie DB
export const connectDB = async () => {
  try {
    await pool.connect(); // Prisijungiame
    console.log('✅ Sėkmingai prisijungta prie DB');
  } catch (error) {
    console.error('❌ Klaida prisijungiant prie DB:', error.stack);
    // Jei nepavyko prisijungti – bandome dar kartą po 5 sek.
    setTimeout(connectDB, 5000);
  }
};

// Funkcija atsijungimui nuo DB
export const disconnectDB = async () => {
  try {
    await pool.end(); // Nutraukiame ryšį su DB
    console.log('🔌 Sėkmingai atsijungta nuo DB');
  } catch (error) {
    console.error('❌ Klaida atsijungiant nuo DB:', error.stack);
  }
};

// Funkcija, kuri vykdo SQL užklausas
export const query = async (text, params) => {
  const start = Date.now(); // Užfiksuojame laiką pradžiai
  try {
    const res = await pool.query(text, params); // Vykdome užklausą
    const duration = Date.now() - start;        // Skaičiuojame trukmę
    console.log(`🟢 Užklausa įvykdyta per ${duration}ms`);
    return res;
  } catch (error) {
    const duration = Date.now() - start;
    console.error('❌ Klaida gaunant duomenis iš DB:', error.stack);
    console.log(`⏱ Užklausa truko ${duration}ms`);
    throw error; // Perduodame klaidą aukščiau
  }
};

// Pagal nutylėjimą eksportuojame pool objektą (jei reikės naudoti tiesiogiai)
export default pool;
