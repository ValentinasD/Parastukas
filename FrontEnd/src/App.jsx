import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/admin/AdminPanel';
import NotFound from './pages/NotFound';
import UsersPage from './pages/admin/UsersPage';
import ToursPage from './pages/admin/ToursPage';
import GroupsPage from './pages//admin/GroupsPage';
import PhotosPage from './pages/admin/PhotosPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<div>Pasirinkite meniu kairėje</div>} />
        <Route path="users" element={<UsersPage />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="photos" element={<PhotosPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
