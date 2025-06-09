import { query } from "../DB_Conection.mjs";

// Gauti visas ekskursijas
export const getAllTours = async () => {
  const result = await query(`
    SELECT 
      t.id, t.title, t.description, t.price, 
      t.duration::text AS duration, 
      t.date, 
      t.photo_id, 
      p.url AS photo_url,
      t.created_at
    FROM tours t
    LEFT JOIN photos p ON t.photo_id = p.id
    ORDER BY t.date ASC
  `);
  return result.rows;
};

// Gauti ekskursiją pagal ID
export const getTourById = async (id) => {
  const result = await query(`SELECT * FROM tours WHERE id = $1`, [id]);
  return result.rows[0];
};

// Sukurti naują ekskursiją
export const createTour = async ({ title, description, price, duration, date, photo_id }) => {
  // Pirmiausia įrašome ekskursiją ir gauname ID
  const insertResult = await query(
    `INSERT INTO tours (title, description, price, duration, date, photo_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [title, description, price, duration, date, photo_id]
  );

  const newId = insertResult.rows[0].id;

  // Tuomet grąžiname pilnus duomenis
  const result = await query(`
    SELECT 
      t.id, t.title, t.description, t.price, 
      t.duration::text AS duration, 
      t.date, 
      t.photo_id, 
      p.url AS photo_url,
      t.created_at
    FROM tours t
    LEFT JOIN photos p ON t.photo_id = p.id
    WHERE t.id = $1
  `, [newId]);

  return result.rows[0];
};

// Atnaujinti ekskursiją (ir grąžinti su photo_url)
export const updateTour = async (id, { title, price, duration, date, photo_id }) => {
  await query(
    `UPDATE tours
     SET title = $1, price = $2, duration = $3, date = $4, photo_id = $5
     WHERE id = $6`,
    [title, price, duration, date, photo_id, id]
  );

  const result = await query(`
    SELECT 
      t.id, t.title, t.description, t.price, 
      t.duration::text AS duration, 
      t.date, 
      t.photo_id, 
      p.url AS photo_url,
      t.created_at
    FROM tours t
    LEFT JOIN photos p ON t.photo_id = p.id
    WHERE t.id = $1
  `, [id]);

  return result.rows[0];
};

// Ištrinti ekskursiją
export const deleteTour = async (id) => {
  await query(`DELETE FROM tours WHERE id = $1`, [id]);
};
