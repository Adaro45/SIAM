import React, { useState, useEffect } from 'react';
import ProjectCardList from '../Components/ProjectCard.jsx'; // Importar la lista de tarjetas
import "../Components/styles/ProjectPage.css";

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/SIAM/projects/');
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        setError('Error al obtener los proyectos.');
        console.error('Error al obtener los proyectos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = () => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    console.log(filtered)
    setFilteredProjects(filtered);
  };

  // Manejo del evento para el input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="projects-page">
      <header className="page-header">
        <h1>Explora Nuestros Proyectos</h1>
        <p>Descubre los proyectos más recientes y destacados.</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Buscar</button>
        </div>
      </header>

      <div className="projects-grid">
        <ProjectCardList projects={filteredProjects} />
      </div>
    </div>
  );
};

export default ProjectsPage;
