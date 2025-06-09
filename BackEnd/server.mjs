// Įkeliame Express framework'ą
import express from 'express';
// Įkeliame CORS, kad galėtume leisti užklausas iš kitų domenų
import cors from 'cors';

// Įkeliame aplinkos kintamuosius iš .env
import dotenv from 'dotenv';
// Įkeliame funkciją prisijungti prie DB
import { connectDB } from './DB_Conection.mjs';
// Įkeliame vartotojų lentelės kūrimo funkciją
import {initAllTables} from './DB_Tables/initAllTables.mjs';

// Įkeliame maršrutus
// (routes) iš atskirų failų
import userRoutes from './routes/userRoutes.mjs';
import tourRoutes from './routes/tourRoutes.mjs';
import groupRoutes from './routes/groupRoutes.mjs';
import photoRoutes from './routes/photoRoutes.mjs';



// Suaktyviname dotenv
dotenv.config();

// Parodome, koks PORT naudojamas
console.log("PORT is", process.env.PORT);

// Inicijuojame Express programą
const app = express();

// Nustatome CORS, kad leistume užklausas iš standartinio localhost:5173 portu
app.use(cors({
  origin: '*', //Leidžiame užklausas iš bet kurio domeno ne saugu * tik kol yra vystymo etapas
}));


app.use(express.json()); // Kad galėtum priimti JSON

// API maršrutai
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/photos', photoRoutes);

const PORT = process.env.PORT || 3000;

// Pagrindinis maršrutas testavimui
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Funkcija paleidžia serverį ir prisijungia prie DB
const startServer = async () => {
  try {
    await connectDB(); // Prisijungiame prie PostgreSQL duomenų bazės
    await initAllTables(); // Sukuriame visas lenteles

    app.listen(PORT, () => {
      console.log(`🚀 Serveris paleistas: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Serverio paleidimo klaida:', err);
  }
};

// ✅ Iškviečiame serverio paleidimo funkciją
startServer();

