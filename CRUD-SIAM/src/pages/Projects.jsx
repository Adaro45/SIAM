import React, { useState, useEffect } from 'react';
import "../Components/styles/ProjectPage.css";
import ProjectCard from '../Components/ProjectCard';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      // Si el input está vacío, restaurar la lista completa
      setFilteredProjects(projects);
    }
  };

  const handleSearch = () => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  };


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(filteredProjects)
  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Explora Nuestros Proyectos</h1>
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
      </div>
      <div className="project-list">
      {filteredProjects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
    </div>
    </div>
  );
};

export default ProjectsPage;
