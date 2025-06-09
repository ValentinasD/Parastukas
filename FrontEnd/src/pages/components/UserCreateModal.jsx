import React, { useState } from "react";

const UserCreateModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password || !formData.name) {
      alert("Užpildykite visus privalomus laukus!");
      return;
    }
    onCreate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">➕ Pridėti nauja vartotoją</h2>

        <label className="block mb-1 text-gray-800">Vardas *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 bg-white text-black"
        />

        <label className="block mb-1 text-gray-800">El. paštas *</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 bg-white text-black"
        />

        <label className="block mb-1 text-gray-800">Slaptažodis *</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 bg-white text-black"
        />

        <label className="block mb-1 text-gray-800">Rolė</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 bg-white text-black"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Atšaukti
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Sukurti
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCreateModal;
