const API_BASE_URL = `${import.meta.env.VITE_API_BASE}/api`;

const createTour = async ({ title, description, price, duration, date, photo_id }) => {
  const res = await fetch(`${API_BASE_URL}/tours`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, price, duration, date, photo_id }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko sukurti ekskursijos (${res.status}): ${errorText}`);
  }

  return await res.json();
};

const getAllTours = async () => {
  const res = await fetch(`${API_BASE_URL}/tours`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko gauti ekskursijų (${res.status}): ${errorText}`);
  }
  return await res.json();
};

const getTourById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/tours/${id}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko gauti ekskursijos su ID ${id} (${res.status}): ${errorText}`);
  }
  return await res.json();
};

const updateTour = async (id, tourData) => {
  const res = await fetch(`${API_BASE_URL}/tours/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tourData),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko atnaujinti ekskursijos su ID ${id} (${res.status}): ${errorText}`);
  }
  return await res.json();
};

const deleteTour = async (id) => {
  const res = await fetch(`${API_BASE_URL}/tours/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko ištrinti ekskursijos su ID ${id} (${res.status}): ${errorText}`);
  }
  return { message: 'Ekskursija sėkmingai ištrinta' };
};

export default {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour
};
