import React, { useState, useEffect } from "react";

const UserEditModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    onSave(user.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">✏️ Redaguoti vartotoją</h2>

        <label className="block mb-2">Vardas</label>
        <input
          name="username" // ✅
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">El. paštas</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Rolė</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Atšaukti</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Išsaugoti</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
