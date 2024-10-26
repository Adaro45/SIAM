import React, { useState, useEffect } from 'react';
import "../Components/styles/ProjectPage.css";
import ProjectCard from '../Components/ProjectCard';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  // Fetch inicial para obtener los proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/SIAM/projects/');
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); // Mostrar todos los proyectos al inicio
      } catch (error) {
        setError('Error al obtener los proyectos.');
        console.error('Error al obtener los proyectos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Cambio en el input de búsqueda
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setFilteredProjects(projects); // Restaurar lista completa si no hay búsqueda
    }
  };

  // Búsqueda
  const handleSearch = () => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  // Paginación
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!projects.length) return <p>No hay proyectos disponibles.</p>;

  return (
    <div className="projects-page">

      <div className="header-banner">
        <div className="header-text">
          <h1>Explora Nuestros Proyectos</h1>
          <p>Innovación y sostenibilidad para un futuro mejor</p>
        </div>
      </div>

      {/* Búsqueda */}
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

      {/* Lista de proyectos */}
      <div className="projects-grid">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={indexOfLastProject >= filteredProjects.length}
        >
          Siguiente
        </button>
      </div>
      
    </div>
  );
};

export default ProjectsPage;
