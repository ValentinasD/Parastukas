import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panelė</h2>
        <nav className="space-y-3">
          <NavLink to="users" className="block hover:text-yellow-300">👤 Vartotojai</NavLink>
          <NavLink to="tours" className="block hover:text-yellow-300">🧭 Ekskursijos</NavLink>
          <NavLink to="groups" className="block hover:text-yellow-300">👫 Grupės</NavLink>
          <NavLink to="photos" className="block hover:text-yellow-300">🖼️ Nuotraukos</NavLink>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
