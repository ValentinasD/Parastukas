import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";


export default function Home() {


  const navigate = useNavigate();


  // Импортируем изображение
  const backgroundImage = '/src/assets/images/7X3An.png';

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔝 Navigacija */}
      <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow">
        <h2 className="text-2xl font-bold">Ekskursijos</h2>
        <nav className="space-x-6">
          {/* <NavLink to="tours" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"}>🧭 Individualios</NavLink>
          <NavLink to="groups" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"}>👫 Grupinės</NavLink> */}
          <NavLink to="register" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"}>👤 Registruotis</NavLink>
          <NavLink to="login" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"}>🔒 Prisijungti</NavLink>
        </nav>      </header>
      
      {/* 💻 Turinys */}      <main 
        className="flex-1 p-8 overflow-auto flex justify-center items-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '100%', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ><div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Grupėms */}
          <div className="bg-white bg-opacity-90 border rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-green-600 w-full py-4 rounded-t-lg flex justify-center">
              <span className="text-white text-3xl">👥</span>
            </div>
            <h3 className="text-xl font-bold mt-4">EKSKURSIJOS GRUPĖMS</h3>
            <p className="text-gray-700 mt-2">
              Užsakomosios ekskursijos Jūsų grupei, šventei ar įdomiam laisvalaikiui
            </p>
            <button
              onClick={() => navigate("/groups")}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Plačiau
            </button>          </div>

          {/* Pavieniams */}
          <div className="bg-white bg-opacity-90 border rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-green-600 w-full py-4 rounded-t-lg flex justify-center">
              <span className="text-white text-3xl">🧍</span>
            </div>
            <h3 className="text-xl font-bold mt-4">EKSKURSIJOS PAVIENIAMS</h3>
            <p className="text-gray-700 mt-2">
              Ekskursijos pavieniams asmenims norintiems prisijungti prie renkamos grupės
            </p>            <button
              onClick={() => navigate("/tours")}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Plačiau
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

