import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔝 Viršutinė navigacija */}
      <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ekskursijos </h2>
        <nav className="space-x-6">
          
          <NavLink
            to="tours"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300"
            }
          >
            🧭 Individualios ekskursijos
          </NavLink>
          <NavLink
            to="groups"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300"
            }
          >
            👫 Grupines ekskursijos
          </NavLink>

          <NavLink
            to="register"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300"
            }
          >
            👤 Registruotis
          </NavLink>

          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-300"
            }
          >
            🔒 Prisijungti
          </NavLink>
        </nav>
      </header>

      {/* 💻 Pagrindinis turinys */}
      <main className="flex-1 bg-gray-100 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
