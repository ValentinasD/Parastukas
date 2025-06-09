import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../../services/userService";
import UserCreateModal from "../components/UserCreateModal";
import UserDeleteModal from "../components/UserDeleteModal";
import UserEditModal from "../components/UserEditModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        if (response) setUsers(response);
      } catch (error) {
        setError(error.message || "Nepavyko gauti vartotojų sąrašo");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setSuccessMessage("✅ Vartotojas ištrintas sėkmingai");
    } catch (err) {
      setErrorMessage("❌ Nepavyko ištrinti vartotojo");
    }
  };

  const handleUpdateUser = async (id, updatedData) => {
    try {
      const updated = await updateUser(id, updatedData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...updated } : user))
      );
      setSuccessMessage("✅ Vartotojas atnaujintas sėkmingai");
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage("❌ Nepavyko atnaujinti vartotojo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="bg-gray-800 rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Vartotojų sąrašas</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Pridėti vartotoją
          </button>
        </div>

        {successMessage && (
          <div className="bg-green-800 border border-green-400 text-green-100 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-800 border border-red-400 text-red-100 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {showAddModal && (
          <UserCreateModal
            onClose={() => setShowAddModal(false)}
            onCreate={async (newUserData) => {
              try {
                const createdUser = await createUser(newUserData);
                setUsers((prev) => [...prev, createdUser]);
                setSuccessMessage("✅ Vartotojas sukurtas sėkmingai");
                setErrorMessage(null);
              } catch {
                setErrorMessage("❌ Nepavyko sukurti vartotojo");
                setSuccessMessage(null);
              }
            }}
          />
        )}

        {selectedUserToDelete && (
          <UserDeleteModal
            user={selectedUserToDelete}
            onClose={() => setSelectedUserToDelete(null)}
            onDelete={handleDeleteUser}
          />
        )}

        {editingUser && (
          <UserEditModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={handleUpdateUser}
          />
        )}

        {!loading && !error && users.length > 0 && (
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-gray-700 text-gray-100">
              <tr>
                <th className="border px-4 py-2">El.Nr</th>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Vardas</th>
                <th className="border px-4 py-2">El. paštas</th>
                <th className="border px-4 py-2">Rolė</th>
                <th className="border px-4 py-2">Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user, index) => (
                <tr key={user.id} className="bg-gray-800 border-t border-gray-700">
                  <td className="border px-4 py-2">{startIndex + index + 1}</td>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      onClick={() => setEditingUser(user)}
                    >
                      ✏️ Redaguoti
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      onClick={() => setSelectedUserToDelete(user)}
                    >
                      🗑️ Ištrinti
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Atgal
          </button>
          <span>Puslapis: {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={startIndex + itemsPerPage >= users.length}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Pirmyn
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
