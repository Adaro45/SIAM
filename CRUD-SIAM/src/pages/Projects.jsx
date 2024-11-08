import React, { useState, useEffect } from 'react';
import "../Components/styles/ProjectPage.css";
import ProjectCard from '../Components/ProjectCard';
import RegionInfo from '../Components/CienfuegosInfo';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  // Fetch para obtener los proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/SIAM/projects/');
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);

        // Extraer áreas únicas de `inv_area`
        const uniqueAreas = Array.from(new Set(data.map(project => project.inv_area)));
        setAreas(uniqueAreas);

      } catch (error) {
        setError('Error al obtener los proyectos.');
        console.error('Error al obtener los proyectos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Manejar cambio en el input de búsqueda
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    handleSearch(e.target.value, selectedArea);
  };

  // Filtrar por búsqueda y por área
  const handleSearch = (term, area) => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(term.toLowerCase()) &&
      (area === '' || project.inv_area === area)
    );
    setFilteredProjects(filtered);
  };

  // Manejar selección del área
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setCurrentPage(1);
    handleSearch(searchTerm, e.target.value);
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
      <RegionInfo />
      
      {/* Búsqueda y filtro por área */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        
        <select value={selectedArea} onChange={handleAreaChange} className="area-select">
          <option value="">Todas las áreas</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>
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
