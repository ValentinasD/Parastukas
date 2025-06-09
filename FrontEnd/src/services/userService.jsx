// 🔗 Bazinis API URL – visiems vartotojų užklausoms
const API_BASE_URL = `${import.meta.env.VITE_API_BASE}/api`;


// 📥 Gauti visų vartotojų sąrašą
export async function getAllUsers() {
  try {
    console.log('⏳ Užklausa: visų vartotojų gavimas...');
    const res = await fetch(`${API_BASE_URL}/users`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko gauti vartotojų (${res.status})`);
    }

    const data = await res.json();
    console.log('✅ Gauti vartotojai:', data.length);
    return data;
  } catch (error) {
    console.error('❌ Klaida gaunant vartotojus:', error);
    throw error;
  }
}

// 📄 Gauti konkretų vartotoją pagal ID
export async function getUserById(id) {
  try {
    console.log(`⏳ Užklausa: vartotojo gavimas su ID ${id}...`);
    const res = await fetch(`${API_BASE_URL}/users/${id}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko gauti vartotojo su ID ${id} (${res.status})`);
    }

    const data = await res.json();
    console.log(`✅ Gauti vartotojo su ID ${id} duomenys:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Klaida gaunant vartotoją su ID ${id}:`, error);
    throw error;
  }
}

// ➕ Sukurti naują vartotoją
export async function createUser(userData) {
  try {
    console.log('⏳ Užklausa: vartotojo kūrimas...', userData);
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko sukurti vartotojo (${res.status})`);
    }

    const data = await res.json();
    console.log('✅ Vartotojas sukurtas:', data);
    return data;
  } catch (error) {
    console.error('❌ Klaida kuriant vartotoją:', error);
    throw error;
  }
}

// ✏️ Atnaujinti vartotojo duomenis pagal ID
export async function updateUser(id, userData) {
  try {
    console.log(`⏳ Užklausa: vartotojo atnaujinimas su ID ${id}...`, userData);
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API klaida (${res.status}):`, errorText);
      throw new Error(`Nepavyko atnaujinti vartotojo su ID ${id} (${res.status})`);
    }

    const data = await res.json();
    console.log(`✅ Vartotojas su ID ${id} atnaujintas:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Klaida atnaujinant vartotoją su ID ${id}:`, error);
    throw error;
  }
}

// 🗑️ Ištrinti vartotoją pagal ID
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error(`Nepavyko ištrinti vartotojo su ID ${id}`);

  // Jei grąžinamas tuščias atsakymas – grąžinti sėkmės objektą
  try {
    return await res.json();
  } catch {
    return { success: true };
  }
}
