import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import AsideOptions from '../Components/Admin/Components/AsideOptions';
import UserManagment from '../Components/Admin/pages/UserManagment';
import Misc from '../Components/Admin/pages/Misc';
import ProjectManagment from '../Components/Admin/pages/ProjectManagment';
import MeasuresAndResources from '../Components/Admin/pages/MeasuresAndResources';
import "../Components/Admin/style/Dashboard.css";

const AdminDashBoard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const username = localStorage.getItem('userName');
      
      if (!accessToken || !username) {
        setError('No tienes acceso. Solo administradores.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/SIAM/user/${username}/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const userRole = response.data.role;

        if (userRole === 'admin') {
          setIsAdmin(true);
        } else {
          setError('No tienes permisos de administrador.');
        }
      } catch (err) {
        setError('Hubo un problema al verificar el rol.');
      }
      setLoading(false);
    };

    checkAdminRole();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='admin_main_container'>
      <aside className="admin_aside">
        <AsideOptions />
      </aside>
      <section className="admin_sec">
        {/* Definimos las rutas anidadas directamente en AdminDashBoard */}
        <Routes>
          <Route path="usermanagment" element={<UserManagment />} />
          <Route path="misc" element={<Misc />} />
          <Route path="projectmanagment" element={<ProjectManagment />} />
          <Route path="measuresandresources" element={<MeasuresAndResources />} />
          <Route path="/" element={<h2>Selecciona una opción de administración</h2>} />
        </Routes>
      </section>
    </div>
  );
};

export default AdminDashBoard;
