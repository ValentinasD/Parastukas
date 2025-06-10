

const API_BASE_URL = `${import.meta.env.VITE_API_BASE}/api`;



const createGroupTour = async ({ name, description, price, duration, photo_id }) => {
  const res = await fetch(`${API_BASE_URL}/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, duration, photo_id }), 
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko sukurti grupinės ekskursijos (${res.status}): ${errorText}`);
  }

  return await res.json();
};



const getAllGroupTours = async () => {
  const res = await fetch(`${API_BASE_URL}/groups`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko gauti grupinių ekskursijų (${res.status}): ${errorText}`);
  }
  return await res.json();
};

const getTourGroupById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/groups/${id}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko gauti grupinės ekskursijos su ID ${id} (${res.status}): ${errorText}`);
  }
  return await res.json();
};

const updateTourGroup = async (id, tourData) => {
  const res = await fetch(`${API_BASE_URL}/groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tourData),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko atnaujinti grupinės ekskursijos su ID ${id} (${res.status}): ${errorText}`);
  }
  return await res.json();
};

const deleteTourGroup = async (id) => {
  const res = await fetch(`${API_BASE_URL}/groups/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Nepavyko ištrinti grupinės ekskursijos su ID ${id} (${res.status}): ${errorText}`);
  }
  return { message: "Ekskursija sėkmingai ištrinta" };
};

export default {
  createGroupTour,
  getAllGroupTours,
  getTourGroupById,
  updateTourGroup,
  deleteTourGroup,
};
