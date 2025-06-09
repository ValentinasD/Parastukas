

const API_BASE_URL = `${import.meta.env.VITE_API_BASE}/api`;

export async function getAllPhotos() {
  try {
    console.log('⏳ Užklausa: visų nuotraukų gavimas...');
    const res = await fetch(`${API_BASE_URL}/photos`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko gauti nuotraukų (${res.status})`);
    }

    const data = await res.json();
    console.log('✅ Gautos nuotraukos:', data.length);
    return data;
  } catch (error) {
    console.error('❌ Klaida gaunant nuotraukas:', error);
    throw error;
  }
}   

export async function getPhotoById(id) {
  try {
    console.log(`⏳ Užklausa: nuotraukos gavimas su ID ${id}...`);
    const res = await fetch(`${API_BASE_URL}/photos/${id}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko gauti nuotraukos su ID ${id} (${res.status})`);
    }

    const data = await res.json();
    console.log(`✅ Gauta nuotrauka su ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Klaida gaunant nuotrauką su ID ${id}:`, error);
    throw error;
  }
}

export async function createPhoto(photoData) {
  try {
    console.log('⏳ Užklausa: nuotraukos kūrimas...', photoData);
    const res = await fetch(`${API_BASE_URL}/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko sukurti nuotraukos (${res.status})`);
    }

    const data = await res.json();
    console.log('✅ Sukurta nuotrauka:', data);
    return data;
  } catch (error) {
    console.error('❌ Klaida kuriant nuotrauką:', error);
    throw error;
  }
}

export async function updatePhoto(id, photoData) {
  try {
    console.log(`⏳ Užklausa: nuotraukos atnaujinimas su ID ${id}...`, photoData);
    const res = await fetch(`${API_BASE_URL}/photos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko atnaujinti nuotraukos su ID ${id} (${res.status})`);
    }

    const data = await res.json();
    console.log(`✅ Atnaujinta nuotrauka su ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Klaida atnaujinant nuotrauką su ID ${id}:`, error);
    throw error;
  }
}

export async function deletePhoto(id) {
  try {
    console.log(`⏳ Užklausa: nuotraukos šalinimas su ID ${id}...`);
    const res = await fetch(`${API_BASE_URL}/photos/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko ištrinti nuotraukos su ID ${id} (${res.status})`);
    }

    console.log(`✅ Nuotrauka su ID ${id} ištrinta.`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Klaida trinant nuotrauką su ID ${id}:`, error);
    throw error;
  }
}

